import { QueryBus } from '@nestjs/cqrs';
import { PublishEventCreatedEvent } from './publish-event-created-event';
import { PubSubEngine } from '@koiner/pubsub-engine';

export const EventPubSubEventHandlers = [
  {
    provide: PublishEventCreatedEvent,
    useFactory: (
      pubSub: PubSubEngine,
      queryBus: QueryBus,
    ): PublishEventCreatedEvent => {
      const eventHandler = new PublishEventCreatedEvent(pubSub, queryBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [PubSubEngine, QueryBus],
  },
];
