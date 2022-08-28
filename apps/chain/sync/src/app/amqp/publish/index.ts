import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishAddressCreatedEvent } from './publish-address-created-event';
import { PublishBlockCreatedEvent } from './publish-block-created-event';
import { PublishOperationCreatedEvent } from './publish-operation-created-event';
import { PublishUploadContractOperationCreatedEvent } from './publish-upload-contract-operation-created-event';
import { PublishEventCreatedEvent } from './publish-event-created-event';

export const ChainAmqpPublishHandlers = [
  {
    provide: PublishAddressCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressCreatedEvent => {
      const eventHandler = new PublishAddressCreatedEvent(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishBlockCreatedEvent,
    useFactory: (amqpConnection: AmqpConnection): PublishBlockCreatedEvent => {
      const eventHandler = new PublishBlockCreatedEvent(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishEventCreatedEvent,
    useFactory: (amqpConnection: AmqpConnection): PublishEventCreatedEvent => {
      const eventHandler = new PublishEventCreatedEvent(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishOperationCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishOperationCreatedEvent => {
      const eventHandler = new PublishOperationCreatedEvent(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishUploadContractOperationCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishUploadContractOperationCreatedEvent => {
      const eventHandler = new PublishUploadContractOperationCreatedEvent(
        amqpConnection
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
];
