import { Injectable } from '@nestjs/common';
import { AMQPPubSub } from 'graphql-amqp-subscriptions';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class PubSubEngine extends AMQPPubSub {}

export const PubSubEngineProvider = (prefix: string) => {
  return {
    provide: PubSubEngine,
    useFactory: async (amqpConnection: AmqpConnection) => {
      return setTimeout(async () => {
        await amqpConnection.managedConnection.connect();

        return new PubSubEngine({
          connection: amqpConnection.managedConnection.connection,
          exchange: {
            name: `${prefix}.channel.graphql.subscriptions`,
            type: 'topic',
            options: {
              durable: false,
              autoDelete: true,
            },
          },
          queue: {
            name: `${prefix}.queue.graphql.subscriptions`,
            options: {
              exclusive: true,
              durable: true,
              autoDelete: true,
            },
            unbindOnDispose: false,
            deleteOnDispose: false,
          },
        });
      }, 1);
    },
    inject: [AmqpConnection],
  };
};
