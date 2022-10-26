import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BlockWithTransactionsCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitBlockWithTxCreatedFromTransactionsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.chain.channel.transaction',
    },
    exchange: 'koiner.chain.event',
    routingKey: BlockWithTransactionsCreatedMessage.routingKey,
    queue: 'koiner.chain.queue.transaction',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new BlockWithTransactionsCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(BlockWithTransactionsCreatedMessage.routingKey, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.chain.channel.transaction message',
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
