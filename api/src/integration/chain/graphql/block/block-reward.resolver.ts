import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BlockNode } from '@koiner/chain/api/graphql';
import {
  BlockRewardNode,
  BlockRewardsLoader,
} from '@koiner/contracts/api/graphql';

@Resolver(() => BlockNode)
export class BlockRewardResolver {
  constructor(private loader: BlockRewardsLoader) {}

  @ResolveField('reward', () => BlockRewardNode, { nullable: true })
  async reward(
    @Parent() block: BlockNode,
  ): Promise<BlockRewardNode | undefined> {
    return this.loader.batch.load(block.header.height.toString());
  }
}
