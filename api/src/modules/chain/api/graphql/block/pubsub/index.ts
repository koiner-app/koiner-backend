import { QueryBus } from '@nestjs/cqrs';
import { PublishBlockCreatedEvent } from './publish-block-created-event';
import { PubSubEngine } from '@koiner/pubsub-engine';

export const BlockPubSubEventHandlers = [
  {
    provide: PublishBlockCreatedEvent,
    useFactory: (
      pubSub: PubSubEngine,
      queryBus: QueryBus,
    ): PublishBlockCreatedEvent => {
      const eventHandler = new PublishBlockCreatedEvent(pubSub, queryBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [PubSubEngine, QueryBus],
  },
];
