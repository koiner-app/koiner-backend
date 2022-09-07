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
        // Default channel for processing events from chain to contracts
        'koiner.contracts.channel.contract': {
          prefetchCount: 1,
          default: true,
        },
        // Channel for processing addresses
        'koiner.contracts.channel.address': {
          prefetchCount: 1,
        },
        // Channel for processing block rewards
        'koiner.contracts.channel.block_reward': {
          prefetchCount: 1,
        },
        // Channel for processing token contracts, events + operations
        'koiner.contracts.channel.token': {
          prefetchCount: 1,
        },
        // Channel for processing updates to TokenHolder for token events (burned, minted, transferred)
        'koiner.contracts.channel.token.token_holder': {
          prefetchCount: 1,
        },
        // Channel for processing updates to Token.totalSupply for token events (burned, minted)
        'koiner.contracts.channel.token.total_supply': {
          prefetchCount: 1,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
