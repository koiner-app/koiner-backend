import {
  Repository,
  ObjectLiteral,
  QueryFailedError,
  ObjectType,
} from 'typeorm';
import {
  AggregateRoot,
  NotFoundException,
  ReferenceNotFoundException,
  SelectionSet,
  WriteRepository,
} from '@appvise/domain';
import { EntitySchemaFactory, EntityBaseSchema } from '.';
import {
  convertDriverForeignKeyError,
  snakeToCamelCase,
} from '@appvise/typeorm/utils';
import { NotUniqueException } from '@appvise/domain';

export class TypeormWriteRepository<
  TEntity extends AggregateRoot<unknown>,
  TEntitySchema extends EntityBaseSchema & ObjectLiteral,
> implements WriteRepository<TEntity>
{
  constructor(
    protected readonly entityModel: Repository<TEntitySchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TEntity,
      TEntitySchema
    >,
    protected readonly entityType: ObjectType<TEntitySchema>,
  ) {}

  async existsById(id: string): Promise<boolean> {
    const found = await this.findOneById(id);

    return !!found;
  }

  async findOneById(
    id: string,
    selectionSet?: SelectionSet,
  ): Promise<TEntity | undefined> {
    // Create QueryBuilder
    const queryBuilder = this.entityModel.createQueryBuilder(
      this.entityType.name,
    );

    // Join with relations if selected
    for (const relation of this.entityModel.metadata.relations) {
      // Convert schema key to camel case
      const camelCaseRelation = snakeToCamelCase(relation.propertyPath);

      if (
        // Ignore soft relations starting with _
        relation.propertyPath[0] !== '_' &&
        (!selectionSet || selectionSet.isSelected(camelCaseRelation))
      ) {
        queryBuilder.leftJoinAndSelect(
          `${this.entityType.name}.${relation.propertyPath}`,
          relation.propertyPath,
        );
      }
    }

    const entityDocument = await queryBuilder
      .where(`${queryBuilder.alias}.id = :id`, { id: `${id}` })
      .getOne();

    return entityDocument
      ? this.entitySchemaFactory.toDomain(entityDocument)
      : undefined;
  }

  async findOneByIdOrThrow(
    id: string,
    selectionSet?: SelectionSet,
  ): Promise<TEntity> {
    const entityDocument = await this.findOneById(id, selectionSet);

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return entityDocument;
  }

  async save(entity: TEntity): Promise<TEntity> {
    entity.validate(); // Protecting invariant before saving

    const ormEntity = this.entitySchemaFactory.toSchema(entity);

    try {
      // TODO: Fix DeepPartial ts-error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await this.entityModel.save(ormEntity);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.entitySchemaFactory.toDomain(result);
    } catch (error) {
      // Handle reference errors with our custom DomainException
      if (error instanceof QueryFailedError) {
        if (
          [
            'ER_NO_REFERENCED_ROW_2', // MySQL driver error
            '23503', // PostGres driver error
          ].includes(error.driverError.code)
        ) {
          // Find reference that failed
          const reference = convertDriverForeignKeyError(error.driverError);

          throw new ReferenceNotFoundException(
            `Reference in ${entity.constructor.name}${reference} not found`,
          );
        }

        // Handle not unique errors
        if (['ER_DUP_ENTRY'].includes(error.driverError.code)) {
          throw new NotUniqueException(
            `${entity.constructor.name} is not unique`,
          );
        }
      }

      throw error;
    }
  }

  async delete(entity: TEntity): Promise<void> {
    entity.validate();
    await this.entityModel.remove(this.entitySchemaFactory.toSchema(entity));
  }
}
