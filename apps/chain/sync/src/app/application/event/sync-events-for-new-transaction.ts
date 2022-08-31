import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { EventParentType, TransactionCreated } from '@koiner/chain/domain';
import { CreateEventCommand } from '@koiner/chain/application';

export class SyncEventsForNewTransaction extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService
  ) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    const txReceipt = await this.rawBlocksService.getTransactionReceipt(
      event.blockHeight,
      event.aggregateId
    );

    if (Array.isArray(txReceipt.events)) {
      for (
        let eventIndex = 0;
        eventIndex < txReceipt.events.length;
        eventIndex++
      ) {
        const transactionEvent = txReceipt.events[eventIndex];

        await this.commandBus.execute(
          new CreateEventCommand({
            parentId: event.aggregateId,
            parentType: EventParentType.transaction,
            sequence: transactionEvent.sequence,
            contractId: transactionEvent.source,
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
