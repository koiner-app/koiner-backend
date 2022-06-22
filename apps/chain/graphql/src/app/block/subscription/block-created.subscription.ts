import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from '@koiner/nestjs-utils';
import { BlockNode } from '@koiner/chain/graphql';

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
