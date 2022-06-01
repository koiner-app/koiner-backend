import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { UploadContractOperationCreated } from '@koiner/chain/domain';
import {
  ContractStandardService,
  CreateContractCommand,
} from '@koiner/contracts/application';

export class CreateContractForUploadedContract extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly contractStandardRetriever: ContractStandardService,
  ) {
    super(UploadContractOperationCreated);
  }

  async handle(event: UploadContractOperationCreated): Promise<void> {
    const contractStandardWithValues =
      await this.contractStandardRetriever.getForContract(event.contractId);

    await this.commandBus.execute(
      new CreateContractCommand({
        id: event.contractId,
        bytecode: event.bytecode,
        abi: event.abi,
        contractStandardType: contractStandardWithValues
          ? contractStandardWithValues.contractStandard.type
          : undefined,
      }),
    );
  }
}
