import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AmqpChannelPostfixes, AmqpTokenChannels } from './amqp';

const tokenHolderChannels = {};
const tokenSupplyChannels = {};

for (let i = 0; i < AmqpTokenChannels.length; i++) {
  tokenSupplyChannels[
    `koiner.tokenize.channel.token.total_supply.${AmqpTokenChannels[i].suffix}`
  ] = {
    prefetchCount: 1,
  };
}

for (let i = 0; i < AmqpChannelPostfixes.length; i++) {
  tokenHolderChannels[
    `koiner.tokenize.channel.token.token_holder.${AmqpChannelPostfixes[i]}`
  ] = {
    prefetchCount: 1,
  };

  tokenSupplyChannels[
    `koiner.tokenize.channel.token.total_supply.${AmqpChannelPostfixes[i]}`
  ] = {
    prefetchCount: 1,
  };
}

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
        'koiner.tokenize.channel.token.contract': {},
        // Channel for processing token events + operations
        'koiner.tokenize.channel.token.event': {},
        // Channel for processing token operations
        'koiner.tokenize.channel.token.operation': {},
        // Channels for processing updates to TokenHolder for token events (burned, minted, transferred)
        ...tokenHolderChannels,
        // Channels for processing updates to Token.totalSupply + stats for token events
        // (burned, minted, transferred)
        ...tokenSupplyChannels,
        // Channel for processing update to Token stats for token events (burned, minted, transferred)
        // and new token contracts
        'koiner.tokenize.channel.token.stats': {
          prefetchCount: 1,
        },
      },
      uri: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    }),
  ],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
