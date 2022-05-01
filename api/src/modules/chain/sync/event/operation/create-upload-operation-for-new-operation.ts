import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
import { CreateUploadContractOperationCommand } from '@koiner/chain/application/operation/command';
import { CreateContractCommand } from '@koiner/contracts/application/contract/command';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';

export class CreateUploadOperationForNewOperation extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService,
    private readonly contractStandardRetriever: ContractStandardService,
  ) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (event.type === OperationType.uploadContract) {
      const rawOperation = await this.rawBlocksService.getOperation(
        event.blockHeight,
        event.transactionId,
        event.operationIndex,
      );

      const contractId = rawOperation.upload_contract.contract_id;

      // Create Address (if not already created). ContractId = address
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand(contractId),
      );

      const contractStandard =
        await this.contractStandardRetriever.getForContract(contractId);

      await this.commandBus.execute(
        new CreateUploadContractOperationCommand(
          event.aggregateId,
          contractId,
          rawOperation.upload_contract.bytecode,
          rawOperation.upload_contract.abi,
          contractStandard ? contractStandard.contractStandard.type : undefined,
        ),
      );

      await this.commandBus.execute(
        new CreateContractCommand(
          contractId,
          event.blockHeight,
          event.transactionId,
          event.operationIndex,
          rawOperation.upload_contract.bytecode,
          rawOperation.upload_contract.abi,
          contractStandard ? contractStandard.contractStandard.type : undefined,
        ),
      );
    }
  }
}
