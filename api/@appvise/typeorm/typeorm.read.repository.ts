import { ObjectType, Repository } from 'typeorm';
import {
  AggregateRoot,
  NotFoundException,
  ReadRepository,
  SelectionSet,
} from '@appvise/domain';
import { EntitySchemaFactory, QueryHelper } from '@appvise/typeorm';
import {
  SearchRequest,
  SearchResponse,
  SearchResult,
  SortDirection,
} from '@appvise/domain';
import { EntityBaseSchema } from '.';
import Paginator from '@appvise/typeorm/paginator';
import { camelToSnakeCase, snakeToCamelCase } from '@appvise/typeorm/utils';

export class TypeormReadRepository<
  TEntity extends AggregateRoot<unknown>,
  TEntitySchema extends EntityBaseSchema,
> implements ReadRepository<TEntity>
{
  private static readonly totalCountFieldName = 'totalCount';

  constructor(
    protected readonly entityModel: Repository<TEntitySchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TEntity,
      TEntitySchema
    >,
    protected readonly entityType: ObjectType<TEntitySchema>,
  ) {}

  async find(
    request: SearchRequest,
    selectionSet?: SelectionSet,
  ): Promise<SearchResponse<TEntity>> {
    // Make sure at least 1 sort field is present
    if (!request.sort) {
      request.sort = [];
    }

    if (request.sort.length < 1) {
      // Use id as fallback for sorting
      request.sort.push({ field: 'id', direction: SortDirection.asc });
    }

    // Create QueryBuilder
    const queryBuilder = this.entityModel.createQueryBuilder(
      this.entityType.name,
    );

    // Add nested filters
    const expressions = QueryHelper.addFilters(
      request.filter ?? [],
      queryBuilder,
    );

    // Join with relations if selected
    for (const relation of this.entityModel.metadata.relations) {
      // Convert schema key to camel case
      const camelCaseRelation = snakeToCamelCase(relation.propertyPath);

      if (
        // Ignore soft relations starting with _
        relation.propertyPath[0] !== '_' &&
        (!selectionSet || selectionSet.isSelected('nodes.' + camelCaseRelation))
      ) {
        queryBuilder.leftJoinAndSelect(
          `${this.entityType.name}.${relation.propertyPath}`,
          relation.propertyPath,
        );
      }
    }

    queryBuilder.where(expressions);

    const paginationKeys: any[] = request.sort.map((sortField) =>
      camelToSnakeCase(sortField.field),
    );

    // Fetch total count
    let totalCount = undefined;
    if (
      selectionSet &&
      selectionSet.isSelected(TypeormReadRepository.totalCountFieldName)
    ) {
      totalCount = await queryBuilder.getCount();
    }

    const paginator = new Paginator(this.entityType, paginationKeys, request);

    // Pass queryBuilder as parameter to get paginate result.
    const response: SearchResponse<TEntitySchema> = await paginator.paginate(
      queryBuilder,
    );

    const results: SearchResult<TEntity>[] = response.results.map((result) => {
      return {
        cursor: result.cursor,
        item: this.entitySchemaFactory.toDomain(result.item),
      };
    });

    return {
      results,
      totalCount,
      pageInfo: response.pageInfo,
    };
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
}
