import { QueryBus } from '@nestjs/cqrs';
import { PublishTransactionCreatedEvent } from './publish-transaction-created-event';
import { PubSubEngine } from '@koiner/pubsub-engine';

export default [
  {
    provide: PublishTransactionCreatedEvent,
    useFactory: (
      pubSub: PubSubEngine,
      queryBus: QueryBus,
    ): PublishTransactionCreatedEvent => {
      const eventHandler = new PublishTransactionCreatedEvent(pubSub, queryBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [PubSubEngine, QueryBus],
  },
];
