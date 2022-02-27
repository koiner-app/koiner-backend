/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot, CreateEntityProps, DateVO, ID } from '@appvise/domain';
import { EntityBaseSchema } from './entity-base.schema';

export type EntitySchemaProps<TEntitySchema> = Omit<
  TEntitySchema,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface EntityProps<TEntityProps> {
  id: ID;
  props: TEntityProps;
}

export abstract class EntitySchemaFactory<
  TEntity extends AggregateRoot<unknown>,
  TEntitySchema extends EntityBaseSchema,
> {
  constructor(
    private entityConstructor: new (props: CreateEntityProps<any>) => TEntity,
    private entitySchemaConstructor: new (
      props: EntitySchemaProps<TEntitySchema>,
    ) => TEntitySchema,
  ) {}

  protected abstract toDomainProps(
    entitySchema: TEntitySchema,
  ): EntityProps<unknown>;

  protected abstract toSchemaProps(
    entity: TEntity,
  ): EntitySchemaProps<TEntitySchema>;

  toDomain(entitySchema: TEntitySchema): TEntity {
    const { id, props } = this.toDomainProps(entitySchema);
    const entitySchemaBase: EntityBaseSchema =
      entitySchema as unknown as EntityBaseSchema;
    return new this.entityConstructor({
      id,
      props,
      createdAt: new DateVO(entitySchemaBase.createdAt),
      updatedAt: new DateVO(entitySchemaBase.updatedAt),
    });
  }

  toSchema(entity: TEntity): TEntitySchema {
    const props = this.toSchemaProps(entity);
    return new this.entitySchemaConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
    });
  }
}
