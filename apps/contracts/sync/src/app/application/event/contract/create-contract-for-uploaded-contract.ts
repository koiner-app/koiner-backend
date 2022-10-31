import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { ContractStandardService } from '@koiner/contracts/standards';
import { UploadContractOperationCreatedMessage } from '@koiner/chain/events';
import { CreateContractCommand } from '@koiner/contracts/application';

@Injectable()
export class CreateContractForUploadedContract {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardService: ContractStandardService
  ) {}

  @OnEvent(UploadContractOperationCreatedMessage.eventName, { async: false })
  async handle(event: UploadContractOperationCreatedMessage): Promise<void> {
    const contractStandardWithValues =
      await this.contractStandardService.getForContract(event.contractId);

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
