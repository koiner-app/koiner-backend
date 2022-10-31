import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { BlockWithTransactionsCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitBlockWithTxCreatedFromTransactionsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventLogger: EventLogger
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.chain.channel.transaction',
    },
    exchange: 'koiner.chain.event',
    routingKey: BlockWithTransactionsCreatedMessage.eventName,
    queue: 'koiner.chain.queue.transaction',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new BlockWithTransactionsCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(BlockWithTransactionsCreatedMessage.eventName, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.chain.channel.transaction message',
            error
          );

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName: BlockWithTransactionsCreatedMessage.eventName,
              },
              error,
              event.height.toString()
            )
            .then((eventLog) => {
              // Reject with small delay based on occurrences of error
              setTimeout(
                () => {
                  reject();
                },
                eventLog.count < 10 ? 2000 : 120000
              );
            });
        });
    });
  }
}
