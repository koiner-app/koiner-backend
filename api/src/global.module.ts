import { Global, Module } from '@nestjs/common';
import { Logger } from '@appvise/domain';
import { NestLogger } from '@appvise/nestjs-utils';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PubSubEngine } from '@koiner/pubsub-engine';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'koinos.event',
          type: 'topic',
        },
      ],
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  providers: [
    NestLogger,
    {
      provide: Logger,
      useClass: NestLogger,
    },
    {
      provide: PubSubEngine,
      useFactory: async (amqpConnection: AmqpConnection) => {
        return new PubSubEngine({
          connection: amqpConnection.connection,
          exchange: {
            name: 'graphql.subscriptions',
            type: 'topic',
            options: {
              durable: false,
              autoDelete: true,
            },
          },
          queue: {
            name: 'graphql.queue',
            options: {
              exclusive: true,
              durable: true,
              autoDelete: true,
            },
            unbindOnDispose: false,
            deleteOnDispose: false,
          },
        });
      },
      inject: [AmqpConnection],
    },
  ],
  exports: [RabbitMQModule, Logger, NestLogger, PubSubEngine],
})
export class GlobalAppModule {}
