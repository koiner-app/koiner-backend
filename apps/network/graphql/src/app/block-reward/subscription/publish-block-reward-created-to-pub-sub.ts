import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PubSubEngine } from '@koiner/nestjs-utils';
import { BlockReward } from '@koiner/network/domain';
import { BlockRewardQuery } from '@koiner/network/application';
import { BlockRewardCreatedMessage } from '@koiner/network/events';
import { BlockRewardNode } from '../dto/block-reward.node';

@Injectable()
export class PublishBlockRewardCreatedToPubSub {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.network.channel.graphql.subscriptions',
    },
    exchange: 'koiner.network.event',
    routingKey: BlockRewardCreatedMessage.routingKey,
    queue: 'koiner.network.queue.graphql.subscriptions',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const event: BlockRewardCreatedMessage = new BlockRewardCreatedMessage(
        JSON.parse(message)
      );

      if (amqpMsg.fields.routingKey !== BlockRewardCreatedMessage.routingKey) {
        reject();
      }

      this.queryBus
        .execute<BlockRewardQuery, BlockReward>(
          new BlockRewardQuery(event.blockHeight)
        )
        .then(async (blockReward) => {
          await this.pubSub.publish('blockRewardCreated', {
            blockRewardCreated: new BlockRewardNode(blockReward),
          });

          resolve();
        });
    });
  }
}
