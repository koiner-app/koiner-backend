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
import { AmqpChannelPostfixes } from '../amqp-channel-postfixes';

const rabbitSubscribeProps = (suffix: string) => {
  return {
    queueOptions: {
      channel: `koiner.tokenize.channel.token.total_supply.${suffix}`,
    },
    exchange: 'koiner.tokenize.event',
    routingKey: [
      `${TokensBurnedEventMessage.eventName}.token.${suffix}`,
      `${TokensMintedEventMessage.eventName}.token.${suffix}`,
      `${TokensTransferredEventMessage.eventName}.token.${suffix}`,
    ],
    queue: `koiner.tokenize.queue.token.total_supply.${suffix}`,
  };
};

@Injectable()
export class EmitEventsTokenSupplyQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /**
   * Split queues in groups based on last letter of to/from address.
   * Use separate queues for koin + vhp.
   * This way we can split the work among multiple queues and
   * still process them synchronously.
   */
  @RabbitSubscribe(rabbitSubscribeProps('koin'))
  async handleKoin(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, 'koin');
  }

  @RabbitSubscribe(rabbitSubscribeProps('vhp'))
  async handleVhp(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, 'vhp');
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[0]))
  async handle0(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[0]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[1]))
  async handle1(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[1]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[2]))
  async handle2(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[2]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[3]))
  async handle3(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[3]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[4]))
  async handle4(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[4]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[5]))
  async handle5(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[5]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[6]))
  async handle6(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[6]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[7]))
  async handle7(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[7]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[8]))
  async handle8(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[8]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[9]))
  async handle9(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[9]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[10]))
  async handle10(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[10]);
  }

  @RabbitSubscribe(rabbitSubscribeProps(AmqpChannelPostfixes[11]))
  async handle11(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return this._handle(message, amqpMsg, AmqpChannelPostfixes[11]);
  }

  async _handle(
    message: any,
    amqpMsg: ConsumeMessage,
    channelSuffix: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      let event:
        | TokensBurnedEventMessage
        | TokensMintedEventMessage
        | TokensTransferredEventMessage;

      const routingKey = amqpMsg.fields.routingKey.replace(
        `.token.${channelSuffix}`,
        ''
      );

      if (routingKey === TokensBurnedEventMessage.eventName) {
        event = new TokensBurnedEventMessage(JSON.parse(message));
      }

      if (routingKey === TokensMintedEventMessage.eventName) {
        event = new TokensMintedEventMessage(JSON.parse(message));
      }

      if (routingKey === TokensTransferredEventMessage.eventName) {
        event = new TokensTransferredEventMessage(JSON.parse(message));
      }

      this.eventEmitter
        .emitAsync(`${routingKey}.total_supply`, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            `Could not process koiner.tokenize.queue.token.total_supply.${channelSuffix} event`,
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
