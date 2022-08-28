import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { ContractStandardService, CreateTokenEventCommand } from '../..';
import {
  ContractEventCreated,
  ContractStandardType,
} from '@koiner/contracts/domain';

export class CreateTokenEventOnContractEventCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService
  ) {
    super(ContractEventCreated);
  }

  async handle(event: ContractEventCreated): Promise<void> {
    if (event.contractStandardType !== ContractStandardType.token) {
      return;
    }

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
        event.contractStandardType,
        event.contractId,
        entryPoint,
        event.data
      );

      await this.commandBus.execute(
        new CreateTokenEventCommand({
          id: event.aggregateId,
          contractId: event.contractId,
          name: decodedEvent.name,
          from: <string>decodedEvent.args.from,
          to: <string>decodedEvent.args.to,
          value: parseInt(<string>decodedEvent.args.value),
        })
      );
    } catch (error) {
      console.log('CreateTokenEvent error', error);
    }
  }
}
