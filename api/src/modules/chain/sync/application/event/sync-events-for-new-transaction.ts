import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TransactionCreated } from '@koiner/chain/domain';
import { CreateEventCommand } from '@koiner/chain/application';
import { RawBlocksService } from '@koinos/raw-blocks.service';

export class SyncEventsForNewTransaction extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService,
  ) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    const txReceipt = await this.rawBlocksService.getTransactionReceipt(
      event.blockHeight,
      event.aggregateId,
    );
    console.log('txReceipt', txReceipt);

    if (Array.isArray(txReceipt.events)) {
      for (
        let eventIndex = 0;
        eventIndex < txReceipt.events.length;
        eventIndex++
      ) {
        const transactionEvent = txReceipt.events[eventIndex];
        console.log('transactionEvent', transactionEvent);

        console.log({
          transactionId: event.aggregateId,
          sequence: transactionEvent.sequence,
          contractId: transactionEvent.source,
          name: transactionEvent.name,
          data: transactionEvent.data,
          impacted: transactionEvent.impacted,
        });
        await this.commandBus.execute(
          new CreateEventCommand({
            transactionId: event.aggregateId,
            sequence: transactionEvent.sequence,
            contractId: transactionEvent.source,
            name: transactionEvent.name,
            data: transactionEvent.data,
            impacted: transactionEvent.impacted,
          }),
        );
      }
    }
  }
}
