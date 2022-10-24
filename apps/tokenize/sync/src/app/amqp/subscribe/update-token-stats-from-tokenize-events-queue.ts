import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { CommandBus } from '@nestjs/cqrs';
import { koinosConfig } from '@koinos/jsonrpc';
import {
  TokenContractCreatedMessage,
  TokensBurnedEventMessage,
  TokensMintedEventMessage,
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
      channel: 'koiner.tokenize.channel.stats.token',
    },
    exchange: 'koiner.tokenize.event',
    routingKey: [
      TokenContractCreatedMessage.routingKey,
      TokensBurnedEventMessage.routingKey,
      TokensMintedEventMessage.routingKey,
      TokensTransferredEventMessage.routingKey,
    ],
    queue: 'koiner.tokenize.queue.stats.token',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const routingKey = amqpMsg.fields.routingKey;

      let contractCount = 0;
      let operationCount = 0;
      let burnCount = 0;
      let mintCount = 0;
      let transferCount = 0;

      if (routingKey === TokenContractCreatedMessage.routingKey) {
        contractCount = 1;
      }

      if (routingKey === TokensBurnedEventMessage.routingKey) {
        burnCount = 1;
        operationCount = 1;
      }

      if (routingKey === TokensMintedEventMessage.routingKey) {
        mintCount = 1;
        operationCount = 1;
      }

      if (routingKey === TokensTransferredEventMessage.routingKey) {
        transferCount = 1;
        operationCount = 1;
      }

      this.commandBus
        .execute(
          new CreateOrUpdateTokenStatsCommand({
            id: koinosConfig.chainId,
            stats: {
              contractCount,
              operationCount,
              burnCount,
              mintCount,
              transferCount,
            },
          })
        )
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.chain.queue.chain.stats message',
            error
          );

          reject();
        });
    });
  }
}
