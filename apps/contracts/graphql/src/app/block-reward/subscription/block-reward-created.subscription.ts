import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from '@koiner/nestjs-utils';
import { BlockRewardNode } from '@koiner/contracts/graphql';

@Resolver(() => BlockRewardNode)
export class BlockRewardCreatedSubscription {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => BlockRewardNode, {
    name: 'blockRewardCreated',
  })
  async blockCreated() {
    return this.pubSub.asyncIterator('blockRewardCreated');
  }
}
