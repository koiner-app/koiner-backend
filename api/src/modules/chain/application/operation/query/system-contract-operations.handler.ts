import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  SystemContractOperation,
  SystemContractOperationReadRepository,
} from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/domain';
import { SystemContractOperationsQuery } from './index';

@QueryHandler(SystemContractOperationsQuery)
export class SystemContractOperationsHandler
  implements IQueryHandler<SystemContractOperationsQuery>
{
  constructor(
    private readonly readRepository: SystemContractOperationReadRepository,
  ) {}

  async execute(
    query: SystemContractOperationsQuery,
  ): Promise<SearchResponse<SystemContractOperation>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
