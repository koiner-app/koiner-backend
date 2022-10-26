import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UploadContractOperationCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitUploadContractOperationCreated {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.contract',
    },
    exchange: 'koiner.chain.event',
    routingKey: UploadContractOperationCreatedMessage.routingKey,
    queue: 'koiner.contracts.queue.contract',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new UploadContractOperationCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(UploadContractOperationCreatedMessage.routingKey, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.channel.contract message',
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
