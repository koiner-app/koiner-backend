import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ContractOperation,
  ContractOperationReadRepository,
} from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/domain';
import { ContractOperationsQuery } from './index';

@QueryHandler(ContractOperationsQuery)
export class ContractOperationsHandler
  implements IQueryHandler<ContractOperationsQuery>
{
  constructor(
    private readonly readRepository: ContractOperationReadRepository,
  ) {}

  async execute(
    query: ContractOperationsQuery,
  ): Promise<SearchResponse<ContractOperation>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
