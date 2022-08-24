import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { BlockCreated, EventParentType } from '@koiner/chain/domain';
import { CreateEventCommand } from '@koiner/chain/application';

export class SyncEventsForNewBlock extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService
  ) {
    super(BlockCreated);
  }

  async handle(event: BlockCreated): Promise<void> {
    const rawBlock = await this.rawBlocksService.getBlock(event.height);

    if (Array.isArray(rawBlock.receipt.events)) {
      for (
        let eventIndex = 0;
        eventIndex < rawBlock.receipt.events.length;
        eventIndex++
      ) {
        const blockEventEvent = rawBlock.receipt.events[eventIndex];

        await this.commandBus.execute(
          new CreateEventCommand({
            parentId: event.aggregateId,
            parentType: EventParentType.block,
            sequence: blockEventEvent.sequence,
            contractId: blockEventEvent.source,
            name: blockEventEvent.name,
            data: blockEventEvent.data,
            impacted: blockEventEvent.impacted
              ? blockEventEvent.impacted.filter(
                  (impactedItem) => impactedItem !== '' // Filter out empty items
                )
              : [],
          })
        );
      }
    }
  }
}
