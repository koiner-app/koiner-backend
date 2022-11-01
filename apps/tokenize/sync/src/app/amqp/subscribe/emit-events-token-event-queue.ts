import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { ContractEventWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class EmitEventsTokenEventQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventLogger: EventLogger
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.event',
    },
    exchange: 'koiner.contracts.event',
    routingKey: ContractEventWithTokenTypeCreatedMessage.eventName,
    queue: 'koiner.tokenize.queue.token.event',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new ContractEventWithTokenTypeCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(ContractEventWithTokenTypeCreatedMessage.eventName, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.tokenize.queue.token.event message',
            error
          );

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName: ContractEventWithTokenTypeCreatedMessage.eventName,
              },
              error,
              event.eventId
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
