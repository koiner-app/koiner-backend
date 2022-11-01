import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { UploadContractOperationCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitUploadContractOperationCreated {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventLogger: EventLogger
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.contract',
    },
    exchange: 'koiner.chain.event',
    routingKey: UploadContractOperationCreatedMessage.eventName,
    queue: 'koiner.contracts.queue.contract',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new UploadContractOperationCreatedMessage(
        JSON.parse(message)
      );

      this.eventEmitter
        .emitAsync(UploadContractOperationCreatedMessage.eventName, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.channel.contract message',
            error
          );

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName: UploadContractOperationCreatedMessage.eventName,
              },
              error,
              event.contractId
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
