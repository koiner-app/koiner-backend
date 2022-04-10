import {
  Brackets,
  ObjectType,
  OrderByCondition,
  SelectQueryBuilder,
  WhereExpressionBuilder,
} from 'typeorm';
import { SearchRequest, SearchResponse, SortDirection } from '@appvise/domain';
import { EntityBaseSchema } from '@appvise/typeorm';
import { atob, btoa, decodeByType, encodeByType } from './utils';

interface CursorParam {
  [key: string]: any;
}

export interface Cursor {
  beforeCursor: string | null;
  afterCursor: string | null;
}

export default class Paginator<TEntitySchema extends EntityBaseSchema> {
  private endCursor: string | null = null;
  private startCursor: string | null = null;
  private readonly alias: string;
  private readonly direction: SortDirection = SortDirection.desc;

  public constructor(
    private entity: ObjectType<TEntitySchema>,
    private paginationKeys: Extract<keyof TEntitySchema, string>[],
    private request: SearchRequest,
  ) {
    if (request.sort.length > 0) {
      this.direction = request.sort[0].direction;
    }

    this.alias = entity.name;
  }

  public async paginate(
    builder: SelectQueryBuilder<TEntitySchema>,
  ): Promise<SearchResponse<TEntitySchema>> {
    builder = this.appendPagingQuery(builder);

    const entities = await builder.getMany();
    const hasMore = entities.length > this.request.first;

    if (hasMore) {
      entities.splice(entities.length - 1, 1);
    }

    if (
      entities.length > 0 &&
      !this.hasAfterCursor() &&
      this.hasBeforeCursor()
    ) {
      entities.reverse();
    }

    if (this.hasBeforeCursor() || hasMore) {
      this.endCursor = this.encode(entities[entities.length - 1]);
    }

    if (this.hasAfterCursor() || (hasMore && this.hasBeforeCursor())) {
      this.startCursor = this.encode(entities[0]);
    }

    return {
      results: entities.map((entity) => {
        return {
          cursor: this.encode(entity),
          item: entity,
        };
      }),
      pageInfo: {
        hasPreviousPage: this.startCursor !== null,
        hasNextPage: this.endCursor !== null,
        startCursor: this.startCursor,
        endCursor: this.endCursor,
      },
    };
  }

  private appendPagingQuery(
    builder: SelectQueryBuilder<TEntitySchema>,
  ): SelectQueryBuilder<TEntitySchema> {
    const cursors: CursorParam = {};

    if (this.hasAfterCursor()) {
      Object.assign(cursors, this.decode(this.request.after));
    } else if (this.hasBeforeCursor()) {
      Object.assign(cursors, this.decode(this.request.before));
    }

    if (Object.keys(cursors).length > 0) {
      builder.andWhere(
        new Brackets((where) => this.buildCursorQuery(where, cursors)),
      );
    }

    builder.take(this.request.first + 1);
    builder.orderBy(this.buildOrder());

    return builder;
  }

  private buildCursorQuery(
    where: WhereExpressionBuilder,
    cursors: CursorParam,
  ): void {
    const operator = this.getOperator();
    const params: CursorParam = {};
    let query = '';
    this.paginationKeys.forEach((key) => {
      params[key] = cursors[key];
      where.orWhere(`${query}${this.alias}.${key} ${operator} :${key}`, params);
      query = `${query}${this.alias}.${key} = :${key} AND `;
    });
  }

  private getOperator(): string {
    if (this.hasAfterCursor()) {
      return this.direction === SortDirection.asc ? '>' : '<';
    }

    if (this.hasBeforeCursor()) {
      return this.direction === SortDirection.asc ? '<' : '>';
    }

    return '=';
  }

  private buildOrder(): OrderByCondition {
    let { direction } = this;

    if (!this.hasAfterCursor() && this.hasBeforeCursor()) {
      direction = this.flipDirection(direction);
    }

    const orderByCondition: OrderByCondition = {};
    this.paginationKeys.forEach((key) => {
      orderByCondition[`${this.alias}.${key}`] =
        direction === SortDirection.desc ? 'DESC' : 'ASC';
    });

    return orderByCondition;
  }

  private hasAfterCursor(): boolean {
    return this.request.after != null;
  }

  private hasBeforeCursor(): boolean {
    return this.request.before != null;
  }

  private encode(entity: TEntitySchema): string {
    const payload = this.paginationKeys
      .map((key) => {
        const type = this.getEntityPropertyType(key);
        const value = encodeByType(type, entity[key]);
        return `${key}:${value}`;
      })
      .join(',');

    return btoa(payload);
  }

  private decode(cursor: string): CursorParam {
    const cursors: CursorParam = {};
    const columns = atob(cursor).split(',');
    columns.forEach((column) => {
      const [key, raw] = column.split(':');
      const type = this.getEntityPropertyType(key);
      const value = decodeByType(type, raw);
      cursors[key] = value;
    });

    return cursors;
  }

  private getEntityPropertyType(key: string): string {
    return Reflect.getMetadata(
      'design:type',
      this.entity.prototype,
      key,
    ).name.toLowerCase();
  }

  private flipDirection(direction: SortDirection): SortDirection {
    return direction === SortDirection.asc
      ? SortDirection.desc
      : SortDirection.asc;
  }
}
