import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  EventCreatedMessage,
  UploadContractOperationCreatedMessage,
} from '@koiner/chain/events';

@Injectable()
export class EmitEventsContractEventsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.contract.events',
    },
    exchange: 'koiner.chain.event',
    routingKey: [
      EventCreatedMessage.routingKey,
      `${UploadContractOperationCreatedMessage.routingKey}.events_queue`,
    ],
    queue: 'koiner.contracts.queue.contract.events',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event: EventCreatedMessage | UploadContractOperationCreatedMessage;
      let routingKey = amqpMsg.fields.routingKey;

      if (routingKey === EventCreatedMessage.routingKey) {
        event = new EventCreatedMessage(JSON.parse(message));
      }

      if (
        routingKey ===
        `${UploadContractOperationCreatedMessage.routingKey}.events_queue`
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
            'Could not process koiner.contracts.queue.contract.events message',
            error
          );
          reject();
        });
    });
  }
}
