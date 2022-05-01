import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenContract,
  TokenContractReadRepository,
} from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/domain';
import { TokenContractsQuery } from '.';

@QueryHandler(TokenContractsQuery)
export class TokenContractsHandler
  implements IQueryHandler<TokenContractsQuery>
{
  constructor(private readonly readRepository: TokenContractReadRepository) {}

  async execute(
    query: TokenContractsQuery,
  ): Promise<SearchResponse<TokenContract>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
