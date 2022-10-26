import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { EventParentType } from '@koiner/chain/domain';
import { BlockCreatedMessage } from '@koiner/chain/events';
import {
  ContractQuery,
  CreateContractEventCommand,
} from '@koiner/contracts/application';
import { Contract } from '@koiner/contracts/domain';

@Injectable()
export class SyncContractEventsForNewBlock {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
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

        if (blockEventEvent.source) {
          let contractStandardType = undefined;

          const contract = await this.queryBus.execute<ContractQuery, Contract>(
            new ContractQuery(blockEventEvent.source)
          );

          contractStandardType = contract.contractStandardType;

          await this.commandBus.execute(
            new CreateContractEventCommand({
              id: UUID.generate().value,
              blockHeight: event.height,
              parentId: event.id,
              parentType: EventParentType.block,
              sequence: blockEventEvent.sequence,
              contractId: blockEventEvent.source,
              contractStandardType,
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
