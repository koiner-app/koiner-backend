import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ContractWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class EmitEventsTokenContractQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.contract',
    },
    exchange: 'koiner.contracts.event',
    routingKey: ContractWithTokenTypeCreatedMessage.eventName,
    queue: 'koiner.tokenize.queue.token.contract',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new ContractWithTokenTypeCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(ContractWithTokenTypeCreatedMessage.eventName, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.tokenize.queue.token.contract message',
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
