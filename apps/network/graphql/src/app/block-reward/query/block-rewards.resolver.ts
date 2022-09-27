import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { BlockReward } from '@koiner/network/domain';
import { BlockRewardsQuery } from '@koiner/network/application';
import {
  BlockRewardNode,
  BlockRewardsConnection,
  BlockRewardsRequest,
} from '../dto';

@Resolver(() => BlockRewardNode)
export class BlockRewardsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlockRewardsConnection, { name: 'blockRewards' })
  async execute(
    @Args() request: BlockRewardsRequest,
    @SelectionSet() selectionSet
  ): Promise<BlockRewardsConnection> {
    const searchResponse = await this.queryBus.execute<
      BlockRewardsQuery,
      SearchResponse<BlockReward>
    >(
      new BlockRewardsQuery(request, selectionSet, [
        'blockHeight',
        'producerId',
        'contractId',
        'burnedContractId',
      ])
    );

    return ConnectionFactory.fromSearchResponse(
      BlockRewardsConnection,
      BlockRewardNode,
      searchResponse,
      selectionSet
    );
  }
}
