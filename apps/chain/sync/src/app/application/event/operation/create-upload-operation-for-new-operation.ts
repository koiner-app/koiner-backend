import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { CreateUploadContractOperationCommand } from '@koiner/chain/application';
import { UploadContractOperationJson } from 'koilib/lib/interface';

export class CreateUploadOperationForNewOperation extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    if (
      event.type === OperationType.uploadContract &&
      event.operationData.upload_contract
    ) {
      const operationJson: UploadContractOperationJson =
        event.operationData.upload_contract;

      await this.commandBus.execute(
        new CreateUploadContractOperationCommand({
          id: event.aggregateId,
          contractId: operationJson.contract_id,
          bytecode: operationJson.bytecode,
          abi: operationJson.abi,
          timestamp: event.timestamp,
        })
      );
    }
  }
}
