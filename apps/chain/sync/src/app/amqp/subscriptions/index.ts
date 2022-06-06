import { QueryBus } from '@nestjs/cqrs';
import { PublishBlockCreatedEvent } from './publish-block-created-event';
import { PubSubEngine } from '@koiner/nestjs-utils';

export const ChainSubscriptionPublishers = [
  {
    provide: PublishBlockCreatedEvent,
    useFactory: async (
      pubSub: PubSubEngine,
      queryBus: QueryBus
    ): Promise<PublishBlockCreatedEvent> => {
      const eventHandler = new PublishBlockCreatedEvent(pubSub, queryBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [PubSubEngine, QueryBus],
  },
];
