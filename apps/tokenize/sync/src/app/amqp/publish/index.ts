import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishAddressUsedForTokenContract } from './address/publish-address-used-for-token-contract';
import { PublishAddressesUsedForTokenEvents } from './address/publish-addresses-used-for-token-events';
import { PublishTokenEvents } from './token/publish-token-events';

export const TokenizeAmqpPublishHandlers = [
  // Address
  {
    provide: PublishAddressUsedForTokenContract,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressUsedForTokenContract => {
      const eventHandler = new PublishAddressUsedForTokenContract(
        amqpConnection
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
  {
    provide: PublishAddressesUsedForTokenEvents,
    useFactory: (
      amqpConnection: AmqpConnection
    ): PublishAddressesUsedForTokenEvents => {
      const eventHandler = new PublishAddressesUsedForTokenEvents(
        amqpConnection
      );

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },

  // Token
  {
    provide: PublishTokenEvents,
    useFactory: (amqpConnection: AmqpConnection): PublishTokenEvents => {
      const eventHandler = new PublishTokenEvents(amqpConnection);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [AmqpConnection],
  },
];
