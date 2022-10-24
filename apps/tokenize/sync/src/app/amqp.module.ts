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
          // Internal events
          name: 'koiner.tokenize.event',
          type: 'topic',
        },
      ],
      // PrefetchCount = 1 will make sure max 1 event can be handled at once,
      // thus making handling chain events synchronously.
      channels: {
        // Channel for processing token contracts
        'koiner.tokenize.channel.token.contract': {
          prefetchCount: 1,
        },
        // Channel for processing token events + operations
        'koiner.tokenize.channel.token.event': {
          prefetchCount: 1,
        },
        // Channel for processing token operations
        'koiner.tokenize.channel.token.operation': {
          prefetchCount: 1,
        },
        // Channel for processing updates to TokenHolder for token events (burned, minted, transferred)
        'koiner.tokenize.channel.token.token_holder': {
          prefetchCount: 1,
        },
        // Channel for processing updates to Token.totalSupply + stats for token events
        // (burned, minted, transferred)
        'koiner.tokenize.channel.token.total_supply': {
          prefetchCount: 1,
        },
        // Channel for processing update to Token stats for token events (burned, minted, transferred)
        // and new token contracts
        'koiner.tokenize.channel.stats.token': {
          prefetchCount: 1,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
