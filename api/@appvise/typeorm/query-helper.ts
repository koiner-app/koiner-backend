import { FilterType } from '@appvise/search';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

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
          // Get sub filter
          let where: string | undefined;
          let parameters: ObjectLiteral | undefined;

          // TODO: Add filtering for all filter types
          if (
            filter['equals'] != null ||
            filter['contains'] != null
            // (filter instanceof StringFilter) ||
            // (filter instanceof NumericFilter) ||
            // (filter instanceof BooleanFilter)
          ) {
            // Parameter must be unique
            const paramName = `${key}_${Math.round(Math.random() * 100000000)}`;

            if (filter['equals']) {
              where = `${builder.alias}.${key} = :${paramName}`;
              parameters = { [paramName]: filter['equals'] };
            } else if (filter['contains']) {
              where = `${builder.alias}.${key} LIKE :${paramName}`;
              parameters = { [paramName]: `%${filter['contains']}%` };
            } else {
              throw new Error('Non-equals filter not implemented yet');
            }

            qb.andWhere(where, parameters);
          } else {
            throw new Error(`Unknown filter type: ${filter.constructor.name}`);
          }
        }
      }
    });
  }
}
