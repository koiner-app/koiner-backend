import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BlockProducersLoader } from '../dataloader/block-producer.loader';
import { BlockRewardNode } from '../dto/block-reward.node';
import { BlockProducerNode } from '../dto/block-producer.node';

@Resolver(() => BlockRewardNode)
export class BlockRewardProducerResolver {
  constructor(private loader: BlockProducersLoader) {}

  @ResolveField('producer', () => BlockProducerNode)
  async producer(
    @Parent() blockReward: BlockRewardNode
  ): Promise<BlockProducerNode> {
    return this.loader.batch.load(blockReward.producerId);
  }
}
