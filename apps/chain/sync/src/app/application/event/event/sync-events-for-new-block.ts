import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/jsonrpc';
import { EventParentType } from '@koiner/domain';
import { CreateEventCommand } from '@koiner/chain/application';
import { BlockCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class SyncEventsForNewBlock {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService
  ) {}

  @OnEvent(BlockCreatedMessage.routingKey, { async: false })
  async handle(event: BlockCreatedMessage): Promise<void> {
    const rawBlock = await this.rawBlocksService.getBlock(event.height);

    if (Array.isArray(rawBlock.receipt.events)) {
      for (
        let eventIndex = 0;
        eventIndex < rawBlock.receipt.events.length;
        eventIndex++
      ) {
        const blockEventEvent = rawBlock.receipt.events[eventIndex];

        // Ignore contract events (handled by contracts service)
        if (!blockEventEvent.source) {
          await this.commandBus.execute(
            new CreateEventCommand({
              blockHeight: event.height,
              parentId: event.id,
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
              timestamp: event.timestamp,
            })
          );
        }
      }
    }
  }
}
