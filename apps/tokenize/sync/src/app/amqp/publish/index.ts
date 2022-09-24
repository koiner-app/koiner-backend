import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublishTokenEvents } from './token/publish-token-events';

export const TokenizeAmqpPublishHandlers = [
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
