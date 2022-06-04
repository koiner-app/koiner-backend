import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import {
  CreateOrUpdateAddressCommand,
  CreateUploadContractOperationCommand,
} from '@koiner/chain/application';
import { RawBlocksService } from '@koinos/jsonrpc';

export class CreateUploadOperationForNewOperation extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService
  ) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (event.type === OperationType.uploadContract) {
      const rawOperation = await this.rawBlocksService.getOperation(
        event.blockHeight,
        event.transactionId,
        event.operationIndex
      );

      const contractId = rawOperation.upload_contract.contract_id;

      // Create Address (if not already created). ContractId = address
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand({
          id: contractId,
        })
      );

      await this.commandBus.execute(
        new CreateUploadContractOperationCommand({
          id: event.aggregateId,
          contractId,
          bytecode: rawOperation.upload_contract.bytecode,
          abi: rawOperation.upload_contract.abi,
        })
      );
    }
  }
}
