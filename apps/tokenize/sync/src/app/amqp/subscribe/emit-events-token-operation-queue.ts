import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { ContractOperationWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class EmitEventsTokenOperationQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventLogger: EventLogger
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.operation',
    },
    exchange: 'koiner.contracts.event',
    routingKey: ContractOperationWithTokenTypeCreatedMessage.eventName,
    queue: 'koiner.tokenize.queue.token.operation',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new ContractOperationWithTokenTypeCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(
          ContractOperationWithTokenTypeCreatedMessage.eventName,
          event
        )
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.tokenize.queue.token.operation message',
            error
          );

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName:
                  ContractOperationWithTokenTypeCreatedMessage.eventName,
              },
              error,
              event.operationId
            )
            .then((eventLog) => {
              // Don't retry when operation is invalid
              if (error.message.includes('Unknown method id')) {
                resolve();
              } else {
                // Reject with small delay based on occurrences of error
                setTimeout(
                  () => {
                    reject();
                  },
                  eventLog.count < 10 ? 2000 : 120000
                );
              }
            });
        });
    });
  }
}
