import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ContractEventWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class EmitEventsTokenEventQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
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

          // Reject with small delay
          setTimeout(() => {
            reject();
          }, 2000);
        });
    });
  }
}
