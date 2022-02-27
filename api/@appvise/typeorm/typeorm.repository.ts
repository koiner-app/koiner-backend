import { ObjectType, Repository as BaseRepository } from 'typeorm';
import {
  AggregateRoot,
  ReadRepository,
  Repository,
  SelectionSet,
  WriteRepository,
} from '@appvise/domain';
import { SearchRequest, SearchResponse } from '@appvise/search';
import {
  EntityBaseSchema,
  EntitySchemaFactory,
  TypeormReadRepository,
  TypeormWriteRepository,
} from './index';

export class TypeormRepository<
  TEntity extends AggregateRoot<unknown>,
  TEntitySchema extends EntityBaseSchema,
> implements Repository<TEntity>
{
  private readonly readRepository: ReadRepository<TEntity>;
  private readonly writeRepository: WriteRepository<TEntity>;

  constructor(
    protected readonly entityModel: BaseRepository<TEntitySchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TEntity,
      TEntitySchema
    >,
    protected readonly entityType: ObjectType<TEntitySchema>,
  ) {
    this.readRepository = new TypeormReadRepository(
      entityModel,
      entitySchemaFactory,
      entityType,
    );

    this.writeRepository = new TypeormWriteRepository(
      entityModel,
      entitySchemaFactory,
    );
  }

  save(entity: TEntity): Promise<TEntity> {
    return this.writeRepository.save(entity);
  }

  delete(entity: TEntity): Promise<void> {
    return this.writeRepository.delete(entity);
  }

  find(
    request: SearchRequest,
    selectionSet?: SelectionSet,
  ): Promise<SearchResponse<TEntity>> {
    return this.readRepository.find(request, selectionSet);
  }

  findOneById(
    id: string,
    selectionSet?: SelectionSet,
  ): Promise<TEntity | undefined> {
    return this.readRepository.findOneById(id, selectionSet);
  }

  findOneByIdOrThrow(
    id: string,
    selectionSet?: SelectionSet,
  ): Promise<TEntity> {
    return this.readRepository.findOneByIdOrThrow(id, selectionSet);
  }
}
