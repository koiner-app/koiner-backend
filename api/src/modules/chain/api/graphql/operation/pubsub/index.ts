import { QueryBus } from '@nestjs/cqrs';
import { PublishOperationCreatedEvent } from './publish-operation-created-event';
import { PubSubEngine } from '@koiner/pubsub-engine';

export default [
  {
    provide: PublishOperationCreatedEvent,
    useFactory: (
      pubSub: PubSubEngine,
      queryBus: QueryBus,
    ): PublishOperationCreatedEvent => {
      const eventHandler = new PublishOperationCreatedEvent(pubSub, queryBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [PubSubEngine, QueryBus],
  },
];
