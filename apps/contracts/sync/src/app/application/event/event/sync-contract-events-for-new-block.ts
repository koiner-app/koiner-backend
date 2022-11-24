import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UUID } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { EventParentType } from '@koiner/domain';
import { BlockCreatedMessage } from '@koiner/chain/events';
import {
  ContractQuery,
  CreateContractEventCommand,
} from '@koiner/contracts/application';
import { Contract } from '@koiner/contracts/domain';
import {
  ContractStandardService,
  ContractStandardType,
} from '@koiner/contracts/standards';
import { ContractEventWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class SyncContractEventsForNewBlock {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rawBlocksService: RawBlocksService,
    private readonly amqpConnection: AmqpConnection,
    private readonly contractStandardService: ContractStandardService
  ) {}

  @OnEvent(BlockCreatedMessage.eventName, { async: false })
  async handle(event: BlockCreatedMessage): Promise<void> {
    const rawBlock = await this.rawBlocksService.getBlock(event.height);

    if (Array.isArray(rawBlock.receipt.events)) {
      for (
        let eventIndex = 0;
        eventIndex < rawBlock.receipt.events.length;
        eventIndex++
      ) {
        const blockEvent = rawBlock.receipt.events[eventIndex];

        if (blockEvent.source) {
          let contractStandardType = undefined;

          const contract = await this.queryBus.execute<ContractQuery, Contract>(
            new ContractQuery(blockEvent.source)
          );

          contractStandardType = contract.contractStandardType;

          const sharedProps = {
            blockHeight: event.height,
            parentId: event.id,
            parentType: EventParentType.block,
            sequence: blockEvent.sequence,
            contractId: blockEvent.source,
            contractStandardType,
            name: blockEvent.name,
            data: blockEvent.data,
            impacted: blockEvent.impacted
              ? blockEvent.impacted.filter(
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
            try {
              const decodedOperation =
                await this.contractStandardService.decodeEvent(
                  blockEvent.source,
                  blockEvent.name,
                  blockEvent.data
                );

              await this.commandBus.execute(
                new CreateContractEventCommand({
                  id: UUID.generate().value,
                  blockHeight: event.height,
                  ...sharedProps,
                  name: decodedOperation.name,
                  decodedData: decodedOperation.data,
                })
              );
            } catch (error) {
              console.log('decoded error', error);
            }
          }
        }
      }
    }
  }
}
