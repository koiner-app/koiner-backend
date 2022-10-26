import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/jsonrpc';
import { OperationType } from '@koiner/chain/domain';
import { CreateOperationCommand } from '@koiner/chain/application';
import { TransactionCreatedMessage } from '@koiner/chain/events';

@Injectable()
export class SyncOperationsForNewTransaction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService
  ) {}

  @OnEvent(TransactionCreatedMessage.routingKey, { async: false })
  async handle(event: TransactionCreatedMessage): Promise<void> {
    const rawTransaction = await this.rawBlocksService.getTransaction(
      event.blockHeight,
      event.id
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
            transactionId: event.id,
            operationIndex: operationIndex,
            type: operationType,
            timestamp: event.timestamp,
            operationData: operation,
          })
        );
      }
    }
  }
}
