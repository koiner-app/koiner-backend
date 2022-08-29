import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  AddressCreatedMessage,
  AddressMarkedAsProducerMessage,
} from '@koiner/contracts/events';

@Injectable()
export class EmitChainSyncQueueEvents {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.chain.contracts_events_channel',
    },
    exchange: 'koiner.contracts.events',
    routingKey: [
      AddressCreatedMessage.routingKey,
      AddressMarkedAsProducerMessage.routingKey,
    ],
    queue: 'koiner.chain.contracts_events',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event: AddressCreatedMessage | AddressMarkedAsProducerMessage;

      if (amqpMsg.fields.routingKey === AddressCreatedMessage.routingKey) {
        event = new AddressCreatedMessage(JSON.parse(message));
      }

      if (
        amqpMsg.fields.routingKey === AddressMarkedAsProducerMessage.routingKey
      ) {
        event = new AddressMarkedAsProducerMessage(JSON.parse(message));
      }

      this.eventEmitter
        .emitAsync(amqpMsg.fields.routingKey, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process contracts.sync queue event',
            error
          );
          reject();
        });
    });
  }
}
