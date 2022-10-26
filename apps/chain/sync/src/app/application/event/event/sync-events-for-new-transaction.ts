import { CommandBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/jsonrpc';
import { EventParentType } from '@koiner/chain/domain';
import { CreateEventCommand } from '@koiner/chain/application';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { TransactionCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class SyncEventsForNewTransaction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService
  ) {}

  @OnEvent(TransactionCreatedMessage.routingKey, { async: false })
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

        await this.commandBus.execute(
          new CreateEventCommand({
            blockHeight: event.blockHeight,
            parentId: event.id,
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
