import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
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
        // Channel for processing contract uploads
        'koiner.contracts.channel.contract': {},
        // Channel for processing block events
        'koiner.contracts.channel.event.block': {},
        // Channel for processing transaction events
        'koiner.contracts.channel.event.transaction': {},
        // Channel for processing operations
        'koiner.contracts.channel.operation': {},
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
