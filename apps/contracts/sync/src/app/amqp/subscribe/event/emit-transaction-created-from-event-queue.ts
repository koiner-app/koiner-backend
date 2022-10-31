import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TransactionCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitTransactionCreatedFromEventQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.event.transaction',
    },
    exchange: 'koiner.chain.event',
    routingKey: TransactionCreatedMessage.eventName,
    queue: 'koiner.contracts.queue.event.transaction',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new TransactionCreatedMessage(JSON.parse(message));

      this.eventEmitter
        .emitAsync(`${TransactionCreatedMessage.eventName}.event_queue`, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.channel.event.transaction message',
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
