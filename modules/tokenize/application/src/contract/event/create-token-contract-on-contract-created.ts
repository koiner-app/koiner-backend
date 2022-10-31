import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import {
  ContractStandardService,
  ContractStandardType,
} from '@koiner/contracts/standards';
import { ContractWithTokenTypeCreatedMessage } from '@koiner/contracts/events';
import { CreateTokenContractCommand } from '../..';

@Injectable()
export class CreateTokenContractOnContractCreated {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService
  ) {}

  @OnEvent(ContractWithTokenTypeCreatedMessage.eventName, { async: false })
  async handle(event: ContractWithTokenTypeCreatedMessage): Promise<void> {
    const contractStandardWithValues =
      await this.contractStandardService.getForContract(
        event.contractId,
        ContractStandardType.token
      );

    if (contractStandardWithValues) {
      const contractValues = contractStandardWithValues.contractValues;

      if (
        contractValues['name'] &&
        contractValues['symbol'] &&
        contractValues['decimals']
      ) {
        await this.commandBus.execute(
          new CreateTokenContractCommand({
            id: event.contractId,
            name: <string>contractValues['name'],
            symbol: <string>contractValues['symbol'],
            decimals: <number>contractValues['decimals'],
            timestamp: event.timestamp,
          })
        );
      }
    }
  }
}
