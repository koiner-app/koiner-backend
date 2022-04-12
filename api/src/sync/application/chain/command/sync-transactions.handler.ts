import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '@koiner/chain/application/transaction/command';
import { SyncTransactionsCommand } from './dto/sync-transactions.command';
import { SyncOperationsCommand } from '@koiner/sync/application/chain/command/dto/sync-operations.command';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
import {
  OperationProps,
  OperationType,
} from '@koiner/chain/domain/operation/operation.types';
import { KoinosId } from '@koiner/domain';
import { UUID } from '@appvise/domain';

@CommandHandler(SyncTransactionsCommand)
export class SyncTransactionsHandler
  implements ICommandHandler<SyncTransactionsCommand>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: SyncTransactionsCommand): Promise<void> {
    for (
      let transactionIndex = 0;
      transactionIndex < command.block.transactions.length;
      transactionIndex++
    ) {
      const transactionJson: any = command.block.transactions[transactionIndex];
      const payer = transactionJson.header.payer;
      const transactionId = transactionJson.id;

      // Create Address (if not already created)
      await this.commandBus.execute(new CreateOrUpdateAddressCommand(payer));

      // Setup operations array
      const operations: OperationProps[] = [];

      if (Array.isArray(transactionJson.operations)) {
        for (
          let operationIndex = 0;
          operationIndex < transactionJson.operations.length;
          operationIndex++
        ) {
          const operation = transactionJson.operations[operationIndex];
          let operationType: OperationType;

          if (operation.set_system_call) {
            operationType = OperationType.systemCall;
          }

          if (operation.set_system_contract) {
            operationType = OperationType.systemContractOperation;
          }

          if (operation.upload_contract) {
            operationType = OperationType.uploadContract;
          }

          if (operation.call_contract) {
            operationType = OperationType.contractOperation;
          }

          operations.push({
            parentId: UUID.generate(),
            blockHeight: command.blockHeight,
            transactionId: new KoinosId(transactionId),
            operationIndex: operationIndex,
            type: operationType,
          });
        }
      }

      // Create Transaction
      await this.commandBus.execute(
        new CreateTransactionCommand(
          transactionId,
          command.blockHeight,
          <string>transactionJson.header.rc_limit,
          payer,
          transactionJson.signatures,
          operations,
          transactionIndex,
          <string>transactionJson.header.nonce,
          transactionJson.header.operation_merkle_root,
        ),
      );

      // Create Operation for created Transaction
      await this.commandBus.execute(
        new SyncOperationsCommand(
          command.blockHeight,
          operations,
          transactionJson,
        ),
      );
    }
  }
}
