import { Resolver, Subscription } from '@nestjs/graphql';
import { EventNode } from '@koiner/chain/api/graphql/event/dto/event.node';
import { PubSubEngine } from '@koiner/pubsub-engine';

@Resolver(() => EventNode)
export class EventCreatedSubscription {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => EventNode, {
    name: 'eventCreated',
  })
  async eventCreated() {
    return this.pubSub.asyncIterator('eventCreated');
  }
}
