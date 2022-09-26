import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PubSubEngine } from '@koiner/nestjs-utils';
import { Block } from '@koiner/chain/domain';
import { BlockQuery } from '@koiner/chain/application';
import { BlockNode } from '@koiner/chain/graphql';
import { BlockCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class PublishBlockCreatedToPubSub {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.chain.channel.graphql.subscriptions',
    },
    exchange: 'koiner.chain.event',
    routingKey: BlockCreatedMessage.routingKey,
    queue: 'koiner.chain.queue.graphql.subscriptions',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const event: BlockCreatedMessage = new BlockCreatedMessage(
        JSON.parse(message)
      );

      if (amqpMsg.fields.routingKey !== BlockCreatedMessage.routingKey) {
        reject();
      }

      this.queryBus
        .execute<BlockQuery, Block>(new BlockQuery(event.height))
        .then(async (block) => {
          await this.pubSub.publish('blockCreated', {
            blockCreated: new BlockNode(block),
          });

          resolve();
        });
    });
  }
}
