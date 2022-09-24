import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          // Events from contracts
          name: 'koiner.tokenize.event',
          type: 'topic',
        },
        {
          name: 'koiner.tokenize.graphql.subscriptions',
          type: 'topic',
          options: {
            durable: false,
            autoDelete: true,
          },
        },
      ],
      channels: {
        'koiner.tokenize.channel.graphql.subscriptions': {
          prefetchCount: 10,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
