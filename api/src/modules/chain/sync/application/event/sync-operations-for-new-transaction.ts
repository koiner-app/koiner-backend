import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { OperationType, TransactionCreated } from '@koiner/chain/domain';
import { CreateOperationCommand } from '@koiner/chain/application';
import { RawBlocksService } from '@koinos/raw-blocks.service';

export class SyncOperationsForNewTransaction extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService,
  ) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    const rawTransaction = await this.rawBlocksService.getTransaction(
      event.blockHeight,
      event.aggregateId,
    );

    if (Array.isArray(rawTransaction.operations)) {
      for (
        let operationIndex = 0;
        operationIndex < rawTransaction.operations.length;
        operationIndex++
      ) {
        const operation = rawTransaction.operations[operationIndex];
        let operationType: OperationType;

        if (operation.set_system_call) {
          operationType = OperationType.systemCall;
        }

        if (operation.set_system_contract) {
          operationType = OperationType.systemContract;
        }

        if (operation.upload_contract) {
          operationType = OperationType.uploadContract;
        }

        if (operation.call_contract) {
          operationType = OperationType.contractOperation;
        }

        await this.commandBus.execute(
          new CreateOperationCommand({
            blockHeight: event.blockHeight,
            transactionId: event.aggregateId,
            operationIndex: operationIndex,
            type: operationType,
          }),
        );
      }
    }
  }
}
