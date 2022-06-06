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
          // Events from chain that must be processed synchronously
          name: 'koiner.chain.sync',
          type: 'topic',
        },
        {
          // Events from chain that can processed asynchronously
          name: 'koiner.chain.events',
          type: 'topic',
        },
        {
          // Events from contracts that can processed asynchronously
          name: 'koiner.contracts.events',
          type: 'topic',
        },
      ],
      channels: {
        // Channel for processing events from koinos chain to koiner chain synchronously
        'koiner.chain.koinos_sync_channel': {
          // PrefetchCount = 1 will make sure max 1 event can be handled at once,
          // thus making handling chain events synchronously.
          prefetchCount: 1,
          default: true,
        },
        // Channel for processing events from contracts to chain asynchronously
        'koiner.chain.contracts_events_channel': {
          prefetchCount: 10,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
