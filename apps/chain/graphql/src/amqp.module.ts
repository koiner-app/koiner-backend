import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'koiner.chain.sync',
          type: 'topic',
        },
        {
          name: 'koiner.chain.events',
          type: 'topic',
        },
        {
          name: 'koiner.contracts.events',
          type: 'topic',
        },
        {
          name: 'koiner.graphql.subscriptions',
          type: 'topic',
          options: {
            durable: false,
            autoDelete: true,
          },
        },
      ],
      channels: {
        'koiner.chain.graphql.subscriptions_channel': {
          prefetchCount: 10,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
