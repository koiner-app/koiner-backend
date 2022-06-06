import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PubSubEngine } from '@koiner/nestjs-utils';
import { Block, BlockHeader, BlockReceipt } from '@koiner/chain/domain';
import { BlockNode } from '@koiner/chain/graphql';
import { BlockCreatedMessage } from '@koiner/chain/events';
import { KoinosId } from '@koiner/domain';

@Injectable()
export class PublishBlockCreatedToPubSub {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus
  ) {}
  @RabbitSubscribe({
    exchange: 'koiner.chain.sync',
    routingKey: BlockCreatedMessage.routingKey,
    queue: 'koiner.graphql.subscriptions.publish',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const event: BlockCreatedMessage = new BlockCreatedMessage(
        JSON.parse(message)
      );

      if (amqpMsg.fields.routingKey !== BlockCreatedMessage.routingKey) {
        reject();
      }

      this.pubSub
        .publish('blockCreated', {
          blockCreated: new BlockNode(
            new Block({
              id: new KoinosId(
                '1234567890123456789012345678901234567890123456789012345678901234567890'
              ),
              props: {
                header: new BlockHeader({
                  previous:
                    '1234567890123456789012345678901234567890123456789012345678901234567890',
                  height: event.height,
                  timestamp: event.timestamp,
                  signer: '1234567890123456789012345678901234',
                }),
                signature:
                  '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
                transactionCount: event.transactionCount,
                receipt: new BlockReceipt({
                  diskStorageUsed: 123,
                  networkBandwidthUsed: 123,
                  computeBandwidthUsed: 123,
                  eventCount: 123,
                }),
              },
            })
          ),
        })
        .then(() => {
          console.log('THEN publish after');

          resolve();
        });

      // this.queryBus
      //   .execute<BlockQuery, Block>(new BlockQuery(event.height))
      //   .then(async (block) => {
      //     console.log('THEN publish');
      //     await this.pubSub.publish('blockCreated', {
      //       blockCreated: new BlockNode(block),
      //     });
      //     console.log('THEN publish after');
      //
      //     resolve();
      //   });
    });
  }
}
