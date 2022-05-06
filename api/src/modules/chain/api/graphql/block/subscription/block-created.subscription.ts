import { Resolver, Subscription } from '@nestjs/graphql';
import { BlockNode } from '@koiner/chain/api/graphql/block/dto/block.node';
import { PubSubEngine } from '@koiner/pubsub-engine';

@Resolver(() => BlockNode)
export class BlockCreatedSubscription {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => BlockNode, {
    name: 'blockCreated',
  })
  async blockCreated() {
    return this.pubSub.asyncIterator('blockCreated');
  }
}
