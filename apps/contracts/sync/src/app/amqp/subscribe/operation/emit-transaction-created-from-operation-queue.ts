import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { TransactionCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitTransactionCreatedFromOperationQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventLogger: EventLogger
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.operation',
    },
    exchange: 'koiner.chain.event',
    routingKey: TransactionCreatedMessage.eventName,
    queue: 'koiner.contracts.queue.operation',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new TransactionCreatedMessage(JSON.parse(message));

      this.eventEmitter
        .emitAsync(
          `${TransactionCreatedMessage.eventName}.operation_queue`,
          event
        )
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.channel.operation message',
            error
          );

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName: `${TransactionCreatedMessage.eventName}.operation_queue`,
              },
              error,
              event.blockHeight.toString()
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
