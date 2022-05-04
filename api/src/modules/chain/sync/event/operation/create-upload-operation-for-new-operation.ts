import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
import { CreateUploadContractOperationCommand } from '@koiner/chain/application/operation/command';
import { RawBlocksService } from '@koinos/raw-blocks.service';

export class CreateUploadOperationForNewOperation extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService,
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

      await this.commandBus.execute(
        new CreateUploadContractOperationCommand(
          event.aggregateId,
          contractId,
          rawOperation.upload_contract.bytecode,
          rawOperation.upload_contract.abi,
        ),
      );
    }
  }
}
