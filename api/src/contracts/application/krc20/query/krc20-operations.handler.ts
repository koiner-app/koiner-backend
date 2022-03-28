import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Krc20Operation,
  Krc20OperationReadRepository,
} from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/search';
import { Krc20OperationsQuery } from '.';

@QueryHandler(Krc20OperationsQuery)
export class Krc20OperationsHandler
  implements IQueryHandler<Krc20OperationsQuery>
{
  constructor(private readonly readRepository: Krc20OperationReadRepository) {}

  async execute(
    query: Krc20OperationsQuery,
  ): Promise<SearchResponse<Krc20Operation>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
