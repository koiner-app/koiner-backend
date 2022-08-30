import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { BlockRewardBalance } from '@koiner/contracts/domain';
import { BlockRewardBalancesQuery } from '@koiner/contracts/application';
import {
  BlockRewardBalanceNode,
  BlockRewardBalancesConnection,
  BlockRewardBalancesRequest,
} from '../dto';

@Resolver(() => BlockRewardBalanceNode)
export class BlockRewardBalancesResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlockRewardBalancesConnection, { name: 'blockRewardBalances' })
  async execute(
    @Args() request: BlockRewardBalancesRequest,
    @SelectionSet() selectionSet
  ): Promise<BlockRewardBalancesConnection> {
    const searchResponse = await this.queryBus.execute<
      BlockRewardBalancesQuery,
      SearchResponse<BlockRewardBalance>
    >(
      new BlockRewardBalancesQuery(request, selectionSet, [
        'addressId',
        'contractId',
      ])
    );

    return ConnectionFactory.fromSearchResponse(
      BlockRewardBalancesConnection,
      BlockRewardBalanceNode,
      searchResponse,
      selectionSet
    );
  }
}
