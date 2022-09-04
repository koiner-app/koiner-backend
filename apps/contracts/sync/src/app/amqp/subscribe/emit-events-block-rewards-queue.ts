import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BlockCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitEventsBlockRewardsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.block_reward',
    },
    exchange: 'koiner.chain.event',
    routingKey: [BlockCreatedMessage.routingKey],
    queue: 'koiner.contracts.queue.block_reward',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event: BlockCreatedMessage;

      if (amqpMsg.fields.routingKey === BlockCreatedMessage.routingKey) {
        event = new BlockCreatedMessage(JSON.parse(message));
      }

      this.eventEmitter
        .emitAsync(amqpMsg.fields.routingKey, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process chain.sync.block queue event',
            error
          );
          reject();
        });
    });
  }
}
