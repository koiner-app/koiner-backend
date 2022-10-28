import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { CommandBus } from '@nestjs/cqrs';
import { koinosConfig } from '@koinos/jsonrpc';
import {
  TokenContractCreatedMessage,
  TokensTransferredEventMessage,
} from '@koiner/tokenize/events';
import { CreateOrUpdateTokenStatsCommand } from '@koiner/tokenize/application';

@Injectable()
export class UpdateTokenStatsFromTokenizeEventsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly commandBus: CommandBus
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.stats',
    },
    exchange: 'koiner.tokenize.event',
    routingKey: [
      TokenContractCreatedMessage.routingKey,
      TokensTransferredEventMessage.routingKey,
    ],
    queue: 'koiner.tokenize.queue.token.stats',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const routingKey = amqpMsg.fields.routingKey;

      let contractCount = 0;
      let transferCount = 0;

      if (routingKey === TokenContractCreatedMessage.routingKey) {
        contractCount = 1;
      }

      if (routingKey === TokensTransferredEventMessage.routingKey) {
        transferCount = 1;
      }

      this.commandBus
        .execute(
          new CreateOrUpdateTokenStatsCommand({
            id: koinosConfig.chainId,
            stats: {
              contractCount,
              transferCount,
            },
          })
        )
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.tokenize.channel.token.stats message',
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
