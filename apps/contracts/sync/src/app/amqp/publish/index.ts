import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishAddressUsedForContract } from './address/publish-address-used-for-contract';
import { PublishBlockRewardCreatedEvent } from './block-reward/publish-block-reward-created-event';
import { PublishContractCreatedEvent } from './contract/publish-contract-created-event';
import { PublishContractEventCreatedEvent } from './contract/publish-contract-event-created-event';
import { PublishContractOperationCreatedEvent } from './contract/publish-contract-operation-created-event';
// import { PublishBlockRewardMintedEvent } from './token/publish-block-reward-minted-event';

export const ContractsAmqpPublishHandlers = [
  // Address
  {
    provide: PublishAddressUsedForContract,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressUsedForContract => {
      const eventHandler = new PublishAddressUsedForContract(amqpConnection);

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

  // // Token
  // {
  //   provide: PublishBlockRewardMintedEvent,
  //   useFactory: (
  //     amqpConnection: AmqpConnection
  //   ): PublishBlockRewardMintedEvent => {
  //     const eventHandler = new PublishBlockRewardMintedEvent(amqpConnection);
  //
  //     eventHandler.listen();
  //
  //     return eventHandler;
  //   },
  //   inject: [AmqpConnection],
  // },
];
