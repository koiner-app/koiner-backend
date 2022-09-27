import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishAddressUsedForNewBlockProducer } from './address/publish-address-used-for-new-block-producer';
import { PublishBlockRewardCreatedEvent } from './block-reward/publish-block-reward-created-event';

export const NetworkAmqpPublishHandlers = [
  // Address
  {
    provide: PublishAddressUsedForNewBlockProducer,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressUsedForNewBlockProducer => {
      const eventHandler = new PublishAddressUsedForNewBlockProducer(
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
];
