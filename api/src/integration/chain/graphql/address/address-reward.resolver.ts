import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SearchResponse } from '@appvise/domain';
import { ConnectionFactory, SelectionSet } from '@appvise/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { AddressNode } from '@koiner/chain/api/graphql/address/dto/address.node';
import { BlockReward } from '@koiner/contracts/domain';
import { BlockRewardsQuery } from '@koiner/contracts/application';
import { BlockRewardsRequest } from '@koiner/contracts/api/graphql/block-reward/dto/block-rewards.request';
import { BlockRewardsConnection } from '@koiner/contracts/api/graphql/block-reward/dto/block-rewards.connection';
import { BlockRewardNode } from '@koiner/contracts/api/graphql/block-reward/dto/block-reward.node';

@Resolver(() => AddressNode)
export class AddressBlockRewardsFieldResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField('blockRewards', () => BlockRewardsConnection)
  async blockRewards(
    @Parent() address: AddressNode,
    @Args() request: BlockRewardsRequest,
    @SelectionSet() selectionSet,
  ): Promise<BlockRewardsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.producerId = { equals: address.id };

    const searchResponse = await this.queryBus.execute<
      BlockRewardsQuery,
      SearchResponse<BlockReward>
    >(new BlockRewardsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      BlockRewardsConnection,
      BlockRewardNode,
      searchResponse,
      selectionSet,
    );
  }
}
