import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Contract, ContractReadRepository } from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/search';
import { ContractsQuery } from '.';

@QueryHandler(ContractsQuery)
export class ContractsHandler implements IQueryHandler<ContractsQuery> {
  constructor(private readonly readRepository: ContractReadRepository) {}

  async execute(query: ContractsQuery): Promise<SearchResponse<Contract>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
