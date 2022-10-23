import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  TokensBurnedEventMessage,
  TokensMintedEventMessage,
  TokensTransferredEventMessage,
} from '@koiner/tokenize/events';

@Injectable()
export class EmitEventsTokenSupplyQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.total_supply',
    },
    exchange: 'koiner.tokenize.event',
    routingKey: [
      TokensBurnedEventMessage.routingKey,
      TokensMintedEventMessage.routingKey,
      TokensTransferredEventMessage.routingKey,
    ],
    queue: 'koiner.tokenize.queue.token.total_supply',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | TokensBurnedEventMessage
        | TokensMintedEventMessage
        | TokensTransferredEventMessage;

      if (amqpMsg.fields.routingKey === TokensBurnedEventMessage.routingKey) {
        event = new TokensBurnedEventMessage(JSON.parse(message));
      }

      if (amqpMsg.fields.routingKey === TokensMintedEventMessage.routingKey) {
        event = new TokensMintedEventMessage(JSON.parse(message));
      }

      if (
        amqpMsg.fields.routingKey === TokensTransferredEventMessage.routingKey
      ) {
        event = new TokensTransferredEventMessage(JSON.parse(message));
      }

      this.eventEmitter
        .emitAsync(`${amqpMsg.fields.routingKey}.total_supply`, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.tokenize.queue.token.total_supply event',
            error
          );
          reject();
        });
    });
  }
}
