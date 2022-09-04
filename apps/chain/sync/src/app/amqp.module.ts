import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          // Events from koinos chain
          name: 'koinos.event',
          type: 'topic',
        },
        {
          // Events from chain
          name: 'koiner.chain.event',
          type: 'topic',
        },
        {
          // Events from contracts
          name: 'koiner.contracts.event',
          type: 'topic',
        },
      ],
      // PrefetchCount = 1 will make sure max 1 event can be handled at once,
      // thus making handling chain events synchronously.
      channels: {
        // Channel for processing events from koinos chain to koiner chain
        'koiner.chain.channel.koinos': {
          prefetchCount: 1,
          default: true,
        },
        // Default channel for processing events from contracts to chain
        'koiner.chain.channel.contracts': {
          prefetchCount: 1,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
