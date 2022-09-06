import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  EventCreatedMessage,
  OperationCreatedMessage,
  UploadContractOperationCreatedMessage,
} from '@koiner/chain/events';

@Injectable()
export class EmitEventsContractQueue {
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
      EventCreatedMessage.routingKey,
      OperationCreatedMessage.routingKey,
      UploadContractOperationCreatedMessage.routingKey,
    ],
    queue: 'koiner.contracts.queue.contract',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | EventCreatedMessage
        | OperationCreatedMessage
        | UploadContractOperationCreatedMessage;

      if (amqpMsg.fields.routingKey === EventCreatedMessage.routingKey) {
        event = new EventCreatedMessage(JSON.parse(message));
      }

      if (amqpMsg.fields.routingKey === OperationCreatedMessage.routingKey) {
        event = new OperationCreatedMessage(JSON.parse(message));
      }

      if (
        amqpMsg.fields.routingKey ===
        UploadContractOperationCreatedMessage.routingKey
      ) {
        event = new UploadContractOperationCreatedMessage(JSON.parse(message));
      }

      this.eventEmitter
        .emitAsync(amqpMsg.fields.routingKey, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.queue.contract queue event',
            error
          );
          reject();
        });
    });
  }
}