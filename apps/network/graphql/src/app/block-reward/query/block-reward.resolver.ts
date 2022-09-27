import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { BlockReward } from '@koiner/network/domain';
import { BlockRewardQuery } from '@koiner/network/application';
import { BlockRewardNode } from '../dto';

@Resolver(() => BlockRewardNode)
export class BlockRewardResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlockRewardNode, { name: 'blockReward' })
  async execute(
    @Args({ name: 'height', type: () => ID }) height: number,
    @SelectionSet() selectionSet: SelectionSetObject
  ): Promise<BlockRewardNode> {
    const blockReward = await this.queryBus.execute<
      BlockRewardQuery,
      BlockReward
    >(new BlockRewardQuery(height, selectionSet));

    return new BlockRewardNode(blockReward);
  }
}
