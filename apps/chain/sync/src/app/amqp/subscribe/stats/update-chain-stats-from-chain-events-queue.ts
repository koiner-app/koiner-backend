import { Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { CommandBus } from '@nestjs/cqrs';
import { koinosConfig } from '@koinos/jsonrpc';
import {
  AddressCreatedMessage,
  OperationCreatedMessage,
  TransactionCreatedMessage,
} from '@koiner/chain/events';
import { CreateOrUpdateChainCommand } from '@koiner/chain/application';

@Injectable()
export class UpdateChainStatsFromChainEventsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly commandBus: CommandBus
  ) {}
  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.chain.channel.chain.stats',
    },
    exchange: 'koiner.chain.event',
    routingKey: [
      AddressCreatedMessage.eventName,
      OperationCreatedMessage.eventName,
      TransactionCreatedMessage.eventName,
    ],
    queue: 'koiner.chain.queue.chain.stats',
  })
  async handle(message: any, amqpMsg: ConsumeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const routingKey = amqpMsg.fields.routingKey;

      let addressCount = 0;
      let operationCount = 0;
      let transactionCount = 0;

      if (routingKey === AddressCreatedMessage.eventName) {
        addressCount = 1;
      }

      if (routingKey === OperationCreatedMessage.eventName) {
        operationCount = 1;
      }

      if (routingKey === TransactionCreatedMessage.eventName) {
        transactionCount = 1;
      }

      this.commandBus
        .execute(
          new CreateOrUpdateChainCommand({
            id: koinosConfig.chainId,
            stats: {
              addressCount,
              operationCount,
              transactionCount,
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
