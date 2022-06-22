import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PubSubEngine } from '@koiner/nestjs-utils';
import { BlockReward } from '@koiner/contracts/domain';
import { BlockRewardQuery } from '@koiner/contracts/application';
import { BlockRewardNode } from '@koiner/contracts/graphql';
import { BlockRewardCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class PublishBlockRewardCreatedToPubSub {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.graphql.subscriptions_channel',
    },
    exchange: 'koiner.contracts.events',
    routingKey: BlockRewardCreatedMessage.routingKey,
    queue: 'koiner.contracts.graphql.subscriptions.publish',
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
