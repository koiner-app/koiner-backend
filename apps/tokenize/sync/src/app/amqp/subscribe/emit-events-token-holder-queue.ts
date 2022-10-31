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
export class EmitEventsTokenHolderQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.token_holder',
    },
    exchange: 'koiner.tokenize.event',
    routingKey: [
      TokensBurnedEventMessage.eventName,
      TokensMintedEventMessage.eventName,
      TokensTransferredEventMessage.eventName,
    ],
    queue: 'koiner.tokenize.queue.token.token_holder',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | TokensBurnedEventMessage
        | TokensMintedEventMessage
        | TokensTransferredEventMessage;

      if (amqpMsg.fields.routingKey === TokensBurnedEventMessage.eventName) {
        event = new TokensBurnedEventMessage(JSON.parse(message));
      }

      if (amqpMsg.fields.routingKey === TokensMintedEventMessage.eventName) {
        event = new TokensMintedEventMessage(JSON.parse(message));
      }

      if (
        amqpMsg.fields.routingKey === TokensTransferredEventMessage.eventName
      ) {
        const parsedMessage = JSON.parse(message);

        if (!parsedMessage.to || parsedMessage.value === 0) {
          this.logger.error(
            `Could not process koiner.tokenize.queue.token.token_holder event ${amqpMsg.fields.routingKey}. Empty to or value = 0.`,
            parsedMessage
          );

          // Apparently transferred event can be published without a recipient and value of 0
          resolve();
          return;
        }
        event = new TokensTransferredEventMessage(parsedMessage);
      }

      this.eventEmitter
        .emitAsync(`${amqpMsg.fields.routingKey}.token_holder`, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            `Could not process koiner.tokenize.queue.token.token_holder event ${amqpMsg.fields.routingKey}`,
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
