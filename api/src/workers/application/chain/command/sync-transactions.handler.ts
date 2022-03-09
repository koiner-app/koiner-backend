import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '@koiner/chain/application/transaction/command';
import { SyncTransactionsCommand } from './dto/sync-transactions.command';
import { SyncOperationsCommand } from '@koiner/workers/application/chain/command/dto/sync-operations.command';
import { CreateAddressCommand } from '@koiner/chain/application/address/command';
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

      // Create Address (if not already created)
      await this.commandBus.execute(new CreateAddressCommand(payer));

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
            blockHeight: parseInt(command.blockHeight),
            transactionId: new KoinosId(transactionJson.id),
            operationIndex: operationIndex,
            type: operationType,
          });
        }
      }

      // Create Transaction
      await this.commandBus.execute(
        new CreateTransactionCommand(
          transactionJson.id,
          parseInt(command.blockHeight),
          <string>transactionJson.header.rc_limit,
          payer,
          transactionJson.signatures.join(','),
          operations,
          transactionIndex,
          <string>transactionJson.header.nonce,
          <string>transactionJson.header.operation_merkle_root,
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
