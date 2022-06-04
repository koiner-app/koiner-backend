import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishBlockCreatedEvent } from './publish-block-created-event';
import { PublishOperationCreatedEvent } from './publish-operation-created-event';
import { PublishUploadContractOperationCreatedEvent } from './publish-upload-contract-operation-created-event';

export const ChainAmqpPublishHandlers = [
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
