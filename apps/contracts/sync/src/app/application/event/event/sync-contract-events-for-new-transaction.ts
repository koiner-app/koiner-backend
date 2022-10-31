import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/jsonrpc';
import { EventParentType } from '@koiner/domain';
import { UUID } from '@appvise/domain';
import { TransactionCreatedMessage } from '@koiner/chain/events';
import {
  ContractQuery,
  CreateContractEventCommand,
} from '@koiner/contracts/application';
import { Contract } from '@koiner/contracts/domain';
import { ContractStandardType } from '@koiner/contracts/standards';
import { ContractEventWithTokenTypeCreatedMessage } from '@koiner/contracts/events';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class SyncContractEventsForNewTransaction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rawBlocksService: RawBlocksService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @OnEvent(`${TransactionCreatedMessage.eventName}.event_queue`, {
    async: false,
  })
  async handle(event: TransactionCreatedMessage): Promise<void> {
    const txReceipt = await this.rawBlocksService.getTransactionReceipt(
      event.blockHeight,
      event.id
    );

    if (Array.isArray(txReceipt.events)) {
      for (
        let eventIndex = 0;
        eventIndex < txReceipt.events.length;
        eventIndex++
      ) {
        const transactionEvent = txReceipt.events[eventIndex];

        if (transactionEvent.source) {
          let contractStandardType = undefined;

          const contract = await this.queryBus.execute<ContractQuery, Contract>(
            new ContractQuery(transactionEvent.source)
          );

          contractStandardType = contract.contractStandardType;

          const sharedProps = {
            blockHeight: event.blockHeight,
            parentId: event.id,
            parentType: EventParentType.transaction,
            sequence: transactionEvent.sequence,
            contractId: transactionEvent.source,
            contractStandardType,
            name: transactionEvent.name,
            data: transactionEvent.data,
            impacted: transactionEvent.impacted
              ? transactionEvent.impacted.filter(
                  (impactedItem) => impactedItem !== '' // Filter out empty items
                )
              : [],
            timestamp: event.timestamp,
          };

          // Don't save token events. Publish message so contract service can process it
          if (contractStandardType === ContractStandardType.token) {
            const message = new ContractEventWithTokenTypeCreatedMessage({
              eventId: UUID.generate().value,
              ...sharedProps,
              publishedAt: Date.now(),
            });

            await this.amqpConnection.publish(
              'koiner.contracts.event',
              ContractEventWithTokenTypeCreatedMessage.eventName,
              message.toString()
            );
          } else {
            await this.commandBus.execute(
              new CreateContractEventCommand({
                id: UUID.generate().value,
                blockHeight: event.blockHeight,
                ...sharedProps,
              })
            );
          }
        }
      }
    }
  }
}
