import { Resolver, Subscription } from '@nestjs/graphql';
import { AddressNode } from '@koiner/chain/api/graphql/address/dto/address.node';
import { PubSubEngine } from '@koiner/pubsub-engine';

@Resolver(() => AddressNode)
export class AddressCreatedSubscription {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => AddressNode, {
    name: 'addressCreated',
  })
  async addressCreated() {
    return this.pubSub.asyncIterator('addressCreated');
  }
}
