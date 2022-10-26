import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishAddressCreatedEvent } from './address/publish-address-created-event';
import { PublishAddressUsedEventForBlockSigner } from './address/publish-address-used-event-for-block-signer';
import { PublishAddressUsedEventForTransactionPayer } from './address/publish-address-used-event-for-transaction-payer';
import { PublishBlockCreatedEvent } from './block/publish-block-created-event';
import { PublishEventCreatedEvent } from './event/publish-event-created-event';
import { PublishOperationCreatedEvent } from './operation/publish-operation-created-event';
import { PublishTransactionCreatedEvent } from './transaction/publish-transaction-created-event';
import { PublishUploadContractOperationCreatedEvent } from './operation/publish-upload-contract-operation-created-event';
import { PublishBlockWithTransactionsCreatedEvent } from './block/publish-block-with-transactions-created-event';

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
    provide: PublishBlockWithTransactionsCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishBlockWithTransactionsCreatedEvent => {
      const eventHandler = new PublishBlockWithTransactionsCreatedEvent(
        amqpConnection
      );

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
