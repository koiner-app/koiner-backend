import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishAddressCreatedEvent } from './address/publish-address-created-event';
import { PublishAddressMarkedAsProducerEvent } from './address/publish-address-marked-as-producer-event';
import { PublishBlockRewardCreatedEvent } from './block-reward/publish-block-reward-created-event';
import { PublishContractCreatedEvent } from './contract/publish-contract-created-event';
import { PublishContractEventCreatedEvent } from './contract/publish-contract-event-created-event';
import { PublishContractOperationCreatedEvent } from './contract/publish-contract-operation-created-event';

export const ContractsAmqpPublishHandlers = [
  // Address
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
    provide: PublishAddressMarkedAsProducerEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressMarkedAsProducerEvent => {
      const eventHandler = new PublishAddressMarkedAsProducerEvent(
        amqpConnection
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },

  // BlockReward
  {
    provide: PublishBlockRewardCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishBlockRewardCreatedEvent => {
      const eventHandler = new PublishBlockRewardCreatedEvent(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },

  // Contract
  {
    provide: PublishContractCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishContractCreatedEvent => {
      const eventHandler = new PublishContractCreatedEvent(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishContractEventCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishContractEventCreatedEvent => {
      const eventHandler = new PublishContractEventCreatedEvent(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishContractOperationCreatedEvent,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishContractOperationCreatedEvent => {
      const eventHandler = new PublishContractOperationCreatedEvent(
        amqpConnection
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
];
