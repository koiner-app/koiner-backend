import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenBalance,
  TokenBalanceReadRepository,
} from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/domain';
import { TokenBalancesQuery } from '.';

@QueryHandler(TokenBalancesQuery)
export class TokenBalancesHandler implements IQueryHandler<TokenBalancesQuery> {
  constructor(private readonly readRepository: TokenBalanceReadRepository) {}

  async execute(
    query: TokenBalancesQuery,
  ): Promise<SearchResponse<TokenBalance>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
