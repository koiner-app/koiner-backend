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
import { utils } from 'koilib';

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
      const payer = utils.encodeBase58(transactionJson.header.payer);
      const transactionId = `0x${utils.toHexString(transactionJson.id)}`;

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

          if (operation.setSystemCall) {
            operationType = OperationType.systemCall;
          }

          if (operation.setSystemContract) {
            operationType = OperationType.systemContractOperation;
          }

          if (operation.uploadContract) {
            operationType = OperationType.uploadContract;
          }

          if (operation.callContract) {
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
          <string>transactionJson.header.rcLimit,
          payer,
          transactionJson.signatures
            .map((signature) => utils.encodeBase64(signature))
            .join(','),
          operations,
          transactionIndex,
          <string>transactionJson.header.nonce,
          utils.encodeBase64(transactionJson.header.operationMerkleRoot),
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
