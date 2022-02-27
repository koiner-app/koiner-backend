import { Repository, ObjectLiteral } from 'typeorm';
import {
  AggregateRoot,
  NotFoundException,
  SelectionSet,
  WriteRepository,
} from '@appvise/domain';
import { EntitySchemaFactory, EntityBaseSchema } from './index';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await this.entityModel.save(ormEntity);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.entitySchemaFactory.toDomain(result);
  }

  async delete(entity: TEntity): Promise<void> {
    entity.validate();
    await this.entityModel.remove(this.entitySchemaFactory.toSchema(entity));
  }
}
