import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { TokenBalance } from '@koiner/contracts/domain';
import { TokenBalancesQuery } from '@koiner/contracts/application';
import {
  TokenBalanceNode,
  TokenBalancesConnection,
  TokenBalancesRequest,
} from '../dto';

@Resolver(() => TokenBalanceNode)
export class TokenBalancesResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => TokenBalancesConnection, { name: 'tokenBalances' })
  async execute(
    @Args() request: TokenBalancesRequest,
    @SelectionSet() selectionSet,
  ): Promise<TokenBalancesConnection> {
    const searchResponse = await this.queryBus.execute<
      TokenBalancesQuery,
      SearchResponse<TokenBalance>
    >(new TokenBalancesQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      TokenBalancesConnection,
      TokenBalanceNode,
      searchResponse,
      selectionSet,
    );
  }
}
