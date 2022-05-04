import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { UploadContractOperationCreated } from '@koiner/chain/domain';
import { CreateContractCommand } from '@koiner/contracts/application/contract/command';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

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
      new CreateContractCommand(
        event.contractId,
        event.bytecode,
        event.abi,
        contractStandardWithValues
          ? contractStandardWithValues.contractStandard.type
          : undefined,
      ),
    );
  }
}
