import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ContractOperationWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class EmitEventsTokenOperationQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.operation',
    },
    exchange: 'koiner.contracts.event',
    routingKey: ContractOperationWithTokenTypeCreatedMessage.routingKey,
    queue: 'koiner.tokenize.queue.token.operation',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new ContractOperationWithTokenTypeCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(
          ContractOperationWithTokenTypeCreatedMessage.routingKey,
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

          // Reject with small delay
          setTimeout(() => {
            reject();
          }, 2000);
        });
    });
  }
}
