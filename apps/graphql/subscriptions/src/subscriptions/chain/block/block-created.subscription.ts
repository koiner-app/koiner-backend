import { Int, Resolver, Query, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from '@koiner/nestjs-utils';
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
    resolve: function (payload, args, { dataSources: { gatewayApi } }, info) {
      return gatewayApi.fetchAndMergeNonPayloadBlockData(
        payload.blockCreated.header.height,
        payload,
        info
      );
    },
  })
  async blockCreated() {
    return this.pubSub.asyncIterator('blockCreated');
  }
}
