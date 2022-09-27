import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          // Internal events
          name: 'koiner.network.event',
          type: 'topic',
        },
      ],
      // PrefetchCount = 1 will make sure max 1 event can be handled at once,
      // thus making handling chain events synchronously.
      channels: {
        // Channel for processing block producers
        'koiner.network.channel.block_producer': {
          prefetchCount: 1,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
