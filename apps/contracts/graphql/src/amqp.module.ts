import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          // Events from contracts
          name: 'koiner.contracts.event',
          type: 'topic',
        },
        {
          name: 'koiner.contracts.graphql.subscriptions',
          type: 'topic',
          options: {
            durable: false,
            autoDelete: true,
          },
        },
      ],
      channels: {
        'koiner.contracts.channel.graphql.subscriptions': {
          prefetchCount: 10,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
