import { Repository, ObjectLiteral, QueryFailedError } from 'typeorm';
import {
  AggregateRoot,
  NotFoundException,
  ReferenceNotFoundException,
  SelectionSet,
  WriteRepository,
} from '@appvise/domain';
import { EntitySchemaFactory, EntityBaseSchema } from '.';

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
  ) {}

  async findOneById(
    id: string,
    selectionSet?: SelectionSet,
  ): Promise<TEntity | undefined> {
    const entityDocument = await this.entityModel.findOne(id);

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
      if (
        error instanceof QueryFailedError &&
        error.driverError.code === 'ER_NO_REFERENCED_ROW_2' &&
        error.driverError.errno === 1452
      ) {
        // Find reference that failed
        let reference = '';
        if (
          error.driverError.sqlMessage &&
          error.driverError.sqlMessage.includes('REFERENCES')
        ) {
          reference = error.driverError.sqlMessage;
          reference = reference.substring(reference.indexOf('REFERENCES') + 12);
          reference = reference.substring(0, reference.indexOf('` (`'));
          reference = ` to \`${reference}\``;
        }
        throw new ReferenceNotFoundException(
          `Reference in ${typeof entity}${reference} not found`,
        );
      }

      throw error;
    }
  }

  async delete(entity: TEntity): Promise<void> {
    entity.validate();
    await this.entityModel.remove(this.entitySchemaFactory.toSchema(entity));
  }
}
