import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishAddressCreatedEvent } from './publish-address-created-event';
import { PublishAddressUsedEventForBlockSigner } from './publish-address-used-event-for-block-signer';
import { PublishAddressUsedEventForTransactionPayer } from './publish-address-used-event-for-transaction-payer';
import { PublishBlockCreatedEvent } from './publish-block-created-event';
import { PublishEventCreatedEvent } from './publish-event-created-event';
import { PublishOperationCreatedEvent } from './publish-operation-created-event';
import { PublishTransactionCreatedEvent } from './publish-transaction-created-event';
import { PublishUploadContractOperationCreatedEvent } from './publish-upload-contract-operation-created-event';

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
    provide: PublishAddressUsedEventForBlockSigner,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressUsedEventForBlockSigner => {
      const eventHandler = new PublishAddressUsedEventForBlockSigner(
        amqpConnection
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishAddressUsedEventForTransactionPayer,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressUsedEventForTransactionPayer => {
      const eventHandler = new PublishAddressUsedEventForTransactionPayer(
        amqpConnection
      );

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
    provide: PublishTransactionCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishTransactionCreatedEvent => {
      const eventHandler = new PublishTransactionCreatedEvent(amqpConnection);

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
