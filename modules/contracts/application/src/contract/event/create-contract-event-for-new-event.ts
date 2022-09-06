import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventCreatedMessage } from '@koiner/chain/events';
import {
  ContractQuery,
  CreateContractEventCommand,
} from '@koiner/contracts/application';
import { Contract } from '@koiner/contracts/domain';

@Injectable()
export class CreateContractEventForNewEvent {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @OnEvent(EventCreatedMessage.routingKey, { async: false })
  async handle(event: EventCreatedMessage): Promise<void> {
    if (event.contractId && event.data) {
      let contractStandardType = undefined;

      try {
        const contract = await this.queryBus.execute<ContractQuery, Contract>(
          new ContractQuery(event.contractId)
        );
        contractStandardType = contract.contractStandardType;
      } catch {
        //
      }

      await this.commandBus.execute(
        new CreateContractEventCommand({
          id: event.id,
          blockHeight: event.blockHeight,
          parentId: event.parentId,
          parentType: event.parentType,
          sequence: event.sequence,
          contractId: event.contractId,
          contractStandardType,
          name: event.name,
          data: event.data,
          impacted: event.impacted,
          timestamp: event.timestamp,
        })
      );
    }
  }
}
