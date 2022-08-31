import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import {
  ContractStandardService,
  CreateContractCommand,
  CreateOrUpdateAddressCommand,
} from '@koiner/contracts/application';
import { UploadContractOperationCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class CreateContractForUploadedContract {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardRetriever: ContractStandardService
  ) {}

  @OnEvent(UploadContractOperationCreatedMessage.routingKey, { async: false })
  async handle(event: UploadContractOperationCreatedMessage): Promise<void> {
    const contractStandardWithValues =
      await this.contractStandardRetriever.getForContract(event.contractId);

    // Create address for contract
    await this.commandBus.execute(
      new CreateOrUpdateAddressCommand({
        id: event.contractId,
      })
    );

    await this.commandBus.execute(
      new CreateContractCommand({
        id: event.contractId,
        bytecode: event.bytecode,
        abi: event.abi,
        contractStandardType: contractStandardWithValues
          ? contractStandardWithValues.contractStandard.type
          : undefined,
        timestamp: event.timestamp,
      })
    );
  }
}
