import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  TokensBurnedEventMessage,
  TokensMintedEventMessage,
} from '@koiner/contracts/events';

@Injectable()
export class EmitEventsTokenSupplyQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.contracts.channel.token.total_supply',
    },
    exchange: 'koiner.contracts.event',
    routingKey: [
      TokensBurnedEventMessage.routingKey,
      TokensMintedEventMessage.routingKey,
    ],
    queue: 'koiner.contracts.queue.token.total_supply',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event: TokensBurnedEventMessage | TokensMintedEventMessage;

      if (amqpMsg.fields.routingKey === TokensBurnedEventMessage.routingKey) {
        event = new TokensBurnedEventMessage(JSON.parse(message));
      }

      if (amqpMsg.fields.routingKey === TokensMintedEventMessage.routingKey) {
        event = new TokensMintedEventMessage(JSON.parse(message));
      }

      this.eventEmitter
        .emitAsync(`${amqpMsg.fields.routingKey}.total_supply`, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.contracts.queue.token.total_supply event',
            error
          );
          reject();
        });
    });
  }
}
