import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  OperationCreatedMessage,
  UploadContractOperationCreatedMessage,
} from '@koiner/chain/events';

@Injectable()
export class EmitEventsContractOperationsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.contract',
    },
    exchange: 'koiner.chain.event',
    routingKey: [
      OperationCreatedMessage.routingKey,
      `${UploadContractOperationCreatedMessage.routingKey}.operations_queue`,
    ],
    queue: 'koiner.contracts.queue.contract.operations',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | OperationCreatedMessage
        | UploadContractOperationCreatedMessage;
      let routingKey = amqpMsg.fields.routingKey;

      if (routingKey === OperationCreatedMessage.routingKey) {
        event = new OperationCreatedMessage(JSON.parse(message));
      }

      if (
        routingKey ===
        `${UploadContractOperationCreatedMessage.routingKey}.operations_queue`
      ) {
        routingKey = UploadContractOperationCreatedMessage.routingKey;
        event = new UploadContractOperationCreatedMessage(JSON.parse(message));
      }

      this.eventEmitter
        .emitAsync(routingKey, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.queue.contract.operations message',
            error
          );
          reject();
        });
    });
  }
}
