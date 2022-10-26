import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/jsonrpc';
import { EventParentType } from '@koiner/chain/domain';
import { UUID } from '@appvise/domain';
import { TransactionCreatedMessage } from '@koiner/chain/events';
import {
  ContractQuery,
  CreateContractEventCommand,
} from '@koiner/contracts/application';
import { Contract } from '@koiner/contracts/domain';

@Injectable()
export class SyncContractEventsForNewTransaction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rawBlocksService: RawBlocksService
  ) {}

  @OnEvent(`${TransactionCreatedMessage.routingKey}.event_queue`, {
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

          await this.commandBus.execute(
            new CreateContractEventCommand({
              id: UUID.generate().value,
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
            })
          );
        }
      }
    }
  }
}
