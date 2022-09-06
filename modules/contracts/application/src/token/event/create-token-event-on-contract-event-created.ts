import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ContractStandardService } from '../../contract-standard/service/contract-standard-service';
import { CreateTokenEventCommand } from '../..';
import { ContractStandardType } from '@koiner/contracts/domain';
import { OnEvent } from '@nestjs/event-emitter';
import { ContractEventWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

@Injectable()
export class CreateTokenEventOnContractEventCreated {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService
  ) {}

  @OnEvent(ContractEventWithTokenTypeCreatedMessage.routingKey, {
    async: false,
  })
  async handle(event: ContractEventWithTokenTypeCreatedMessage): Promise<void> {
    try {
      let entryPoint = 0x27f576ca;

      // TODO: Find way to retrieve using contract standards
      if (event.name.endsWith('.transfer')) {
        entryPoint = 0x27f576ca;
      } else if (event.name.endsWith('.mint')) {
        entryPoint = 0xdc6f17bb;
      } else if (event.name.endsWith('.burn')) {
        entryPoint = 0x859facc5;
      }

      const decodedEvent = await this.contractStandardService.decodeOperation(
        ContractStandardType.token,
        event.contractId,
        entryPoint,
        event.data
      );

      await this.commandBus.execute(
        new CreateTokenEventCommand({
          id: event.eventId,
          contractId: event.contractId,
          name: decodedEvent.name,
          from: <string>decodedEvent.args.from,
          to: <string>decodedEvent.args.to,
          value: parseInt(<string>decodedEvent.args.value),
          timestamp: event.timestamp,
          parentId: event.parentId,
          parentType: event.parentType,
        })
      );
    } catch (error) {
      console.log('CreateTokenEvent error', error);
    }
  }
}
