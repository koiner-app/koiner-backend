import { FilterType } from '@appvise/domain';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { camelToSnakeCase } from '@appvise/typeorm/utils';

export class QueryHelper {
  static addFilters<TEntitySchema>(
    filters: FilterType,
    builder: SelectQueryBuilder<TEntitySchema>,
  ): Brackets {
    return new Brackets((qb) => {
      for (const [key, filter] of Object.entries(filters)) {
        if (key === 'AND' || key === 'OR') {
          // Root statement is always andWhere
          qb.andWhere(
            new Brackets((qbSub) => {
              // Loop through AND/OR filters array
              for (let i = 0; i < filter.length; i++) {
                // Recursively retrieve sub filters
                const expressions = QueryHelper.addFilters(filter[i], builder);

                // Add sub filters to brackets
                if (key === 'OR') {
                  qbSub.orWhere(expressions);
                } else {
                  qbSub.andWhere(expressions);
                }
              }
            }),
          );
        } else {
          enum filterTypes {
            'equals' = '=',
            'contains' = 'LIKE',
            'excludes' = 'NOT LIKE',
            'lt' = '<',
            'lte' = '<=',
            'gt' = '>',
            'gte' = '>=',
          }

          let selectedFilterType: string | null = null;
          let filterValue = null;

          for (const filterType in filterTypes) {
            if (filter[filterType] != null) {
              selectedFilterType = filterType;
              filterValue = filter[filterType];
            }
          }

          if (selectedFilterType == null && filterValue == null) {
            throw new Error(`Unknown filter type: ${filter.constructor.name}`);
          }

          // Convert filter keys because field names are in snake case
          const snakeKey = camelToSnakeCase(key);

          // Parameter must be unique
          const paramName = `${snakeKey}_${Math.round(
            Math.random() * 100000000,
          )}`;

          if (['contains', 'excludes'].includes(selectedFilterType)) {
            filterValue = `%${filterValue}%`;
          }

          const operator = filterTypes[selectedFilterType];

          const where = `${builder.alias}.${snakeKey} ${operator} :${paramName}`;
          const parameters: ObjectLiteral = { [paramName]: filterValue };

          qb.andWhere(where, parameters);
        }
      }
    });
  }
}
