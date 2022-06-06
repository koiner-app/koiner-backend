import { Int, Resolver, Query, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from '@koiner/nestjs-utils';
// TODO: Import from shared module
import { BlockNode } from '@koiner/chain/graphql';

@Resolver(() => BlockNode)
export class BlockCreatedSubscription {
  constructor(private readonly pubSub: PubSubEngine) {}

  // TODO: Make this removable
  /**
   * Schema requires at least 1 query to be present
   */
  @Query(() => Int, {
    name: 'placeholder',
  })
  placeholder() {
    return true;
  }

  @Subscription(() => BlockNode, {
    name: 'blockCreated',
  })
  async blockCreated() {
    return this.pubSub.asyncIterator('blockCreated');
  }
}
