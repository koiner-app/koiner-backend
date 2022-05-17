import { QueryBus } from '@nestjs/cqrs';
import { PublishAddressCreatedEvent } from './publish-address-created-event';
import { PubSubEngine } from '@koiner/pubsub-engine';

export const AddressPubSubEventHandlers = [
  {
    provide: PublishAddressCreatedEvent,
    useFactory: (
      pubSub: PubSubEngine,
      queryBus: QueryBus,
    ): PublishAddressCreatedEvent => {
      const eventHandler = new PublishAddressCreatedEvent(pubSub, queryBus);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [PubSubEngine, QueryBus],
  },
];
