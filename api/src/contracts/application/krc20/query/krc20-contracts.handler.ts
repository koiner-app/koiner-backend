import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Krc20Contract,
  Krc20ContractReadRepository,
} from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/search';
import { Krc20ContractsQuery } from '.';

@QueryHandler(Krc20ContractsQuery)
export class Krc20ContractsHandler
  implements IQueryHandler<Krc20ContractsQuery>
{
  constructor(private readonly readRepository: Krc20ContractReadRepository) {}

  async execute(
    query: Krc20ContractsQuery,
  ): Promise<SearchResponse<Krc20Contract>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
