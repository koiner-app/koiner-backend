import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BlockCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitBlockCreatedFromEventQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.event.block',
    },
    exchange: 'koiner.chain.event',
    routingKey: BlockCreatedMessage.eventName,
    queue: 'koiner.contracts.queue.event.block',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new BlockCreatedMessage(JSON.parse(message));

      this.eventEmitter
        .emitAsync(BlockCreatedMessage.eventName, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.channel.event.block message',
            error
          );

          // Reject with small delay
          setTimeout(() => {
            reject();
          }, 2000);
        });
    });
  }
}
