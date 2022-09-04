import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ContractEventWithTokenTypeCreatedMessage,
  ContractOperationWithTokenTypeCreatedMessage,
  ContractWithTokenTypeCreatedMessage,
} from '@koiner/contracts/events';

@Injectable()
export class EmitEventsTokenQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.token',
    },
    exchange: 'koiner.contracts.event',
    routingKey: [
      ContractWithTokenTypeCreatedMessage.routingKey,
      ContractOperationWithTokenTypeCreatedMessage.routingKey,
      ContractEventWithTokenTypeCreatedMessage.routingKey,
    ],
    queue: 'koiner.contracts.queue.token',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | ContractWithTokenTypeCreatedMessage
        | ContractOperationWithTokenTypeCreatedMessage
        | ContractEventWithTokenTypeCreatedMessage;

      if (
        amqpMsg.fields.routingKey ===
        ContractWithTokenTypeCreatedMessage.routingKey
      ) {
        event = new ContractWithTokenTypeCreatedMessage(JSON.parse(message));
      }

      if (
        amqpMsg.fields.routingKey ===
        ContractOperationWithTokenTypeCreatedMessage.routingKey
      ) {
        event = new ContractOperationWithTokenTypeCreatedMessage(
          JSON.parse(message)
        );
      }

      if (
        amqpMsg.fields.routingKey ===
        ContractEventWithTokenTypeCreatedMessage.routingKey
      ) {
        event = new ContractEventWithTokenTypeCreatedMessage(
          JSON.parse(message)
        );
      }

      this.eventEmitter
        .emitAsync(amqpMsg.fields.routingKey, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.queue.token event',
            error
          );
          reject();
        });
    });
  }
}
