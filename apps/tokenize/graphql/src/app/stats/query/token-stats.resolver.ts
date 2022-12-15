import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { koinosConfig } from '@koinos/jsonrpc';
import { TokenStats } from '@koiner/tokenize/domain';
import { TokenStatsQuery } from '@koiner/tokenize/application';
import { TokenStatsNode } from '../dto';

@Resolver(() => TokenStatsNode)
export class TokenStatsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => TokenStatsNode, { name: 'tokenStats' })
  async execute(
    @SelectionSet() selectionSet: SelectionSetObject,
    @Args({
      name: 'id',
      type: () => ID,
      nullable: true,
      description: 'Leave empty to retrieve token stats for koinos chain',
    })
    id?: string
  ): Promise<TokenStatsNode> {
    const tokenStats: TokenStats = await this.queryBus.execute<
      TokenStatsQuery,
      TokenStats
    >(new TokenStatsQuery(id ?? koinosConfig.chainId, selectionSet));

    return new TokenStatsNode(tokenStats);
  }
}
