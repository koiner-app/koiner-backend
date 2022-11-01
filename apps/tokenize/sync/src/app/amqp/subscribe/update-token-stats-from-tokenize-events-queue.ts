import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { ConsumeMessage } from 'amqplib';
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
    private readonly commandBus: CommandBus,
    private readonly eventLogger: EventLogger
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.tokenize.channel.token.stats',
    },
    exchange: 'koiner.tokenize.event',
    routingKey: [
      TokenContractCreatedMessage.eventName,
      TokensTransferredEventMessage.eventName,
    ],
    queue: 'koiner.tokenize.queue.token.stats',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      let event: TokenContractCreatedMessage | TokensTransferredEventMessage;

      const routingKey = amqpMsg.fields.routingKey;

      let contractCount = 0;
      let transferCount = 0;

      if (routingKey === TokenContractCreatedMessage.eventName) {
        contractCount = 1;
        event = new TokenContractCreatedMessage(JSON.parse(message));
      }

      if (routingKey === TokensTransferredEventMessage.eventName) {
        transferCount = 1;
        event = new TokensTransferredEventMessage(JSON.parse(message));
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

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName: routingKey,
              },
              error,
              event.contractId
            )
            .then((eventLog) => {
              // Reject with small delay based on occurrences of error
              setTimeout(
                () => {
                  reject();
                },
                eventLog.count < 10 ? 2000 : 120000
              );
            });
        });
    });
  }
}
