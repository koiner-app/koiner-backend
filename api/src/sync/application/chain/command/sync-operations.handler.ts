import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { SyncOperationsCommand } from './dto/sync-operations.command';
import { CreateAddressCommand } from '@koiner/chain/application/address/command';
import {
  CreateContractOperationCommand,
  CreateSystemCallOperationCommand,
  CreateSystemContractOperationCommand,
  CreateUploadContractOperationCommand,
} from '@koiner/chain/application/operation/command';
import { TransactionQuery } from '@koiner/chain/application/transaction/query';
import { OperationType, Transaction } from '@koiner/chain/domain';
import { Contract } from '@koiner/contracts/domain';
import { CreateContractCommand } from '@koiner/contracts/application/contract/command';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { ContractQuery } from '@koiner/contracts/application/contract/query';
import { utils } from 'koilib';

@CommandHandler(SyncOperationsCommand)
export class SyncOperationsHandler
  implements ICommandHandler<SyncOperationsCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly contractStandardRetriever: ContractStandardService,
  ) {}

  async execute(command: SyncOperationsCommand): Promise<void> {
    const transactionJson: any = command.transaction;
    const transactionId = `0x${utils.toHexString(command.transaction.id)}`;

    // We need both persisted transaction (with operationIds) and transactionJson from JSON-RPC api
    const transaction = await this.queryBus.execute<
      TransactionQuery,
      Transaction
    >(new TransactionQuery(transactionId));

    if (Array.isArray(transaction.operations)) {
      for (
        let operationIndex = 0;
        operationIndex < transaction.operations.length;
        operationIndex++
      ) {
        const savedOperation = transaction.operations[operationIndex];
        const operationJson = transactionJson.operations[operationIndex];

        if (savedOperation.type === OperationType.systemCall) {
          await this.commandBus.execute(
            new CreateSystemCallOperationCommand(
              savedOperation.id.value,
              utils.encodeBase58(
                operationJson.setSystemCall.target.systemCallBundle.contractId,
              ),
              operationJson.setSystemCall.callId,
            ),
          );
        } else if (
          savedOperation.type === OperationType.systemContractOperation
        ) {
          await this.commandBus.execute(
            new CreateSystemContractOperationCommand(
              savedOperation.id.value,
              utils.encodeBase58(operationJson.setSystemContract.contractId),
              operationJson.setSystemContract.systemContract,
            ),
          );
        } else if (savedOperation.type === OperationType.uploadContract) {
          const contractId = utils.encodeBase58(
            operationJson.uploadContract.contractId,
          );

          // Create Address (if not already created). ContractId = address
          await this.commandBus.execute(new CreateAddressCommand(contractId));

          const contractStandard =
            await this.contractStandardRetriever.getForContract(contractId);

          await this.commandBus.execute(
            new CreateUploadContractOperationCommand(
              savedOperation.id.value,
              contractId,
              operationJson.uploadContract.bytecode,
              operationJson.uploadContract.abi,
              contractStandard
                ? contractStandard.contractStandard.type
                : undefined,
            ),
          );

          await this.commandBus.execute(
            new CreateContractCommand(
              contractId,
              command.blockHeight,
              transactionId,
              operationIndex,
              operationJson.uploadContract.bytecode,
              operationJson.uploadContract.abi,
              contractStandard
                ? contractStandard.contractStandard.type
                : undefined,
            ),
          );
        } else if (savedOperation.type === OperationType.contractOperation) {
          const contractId = utils.encodeBase58(
            operationJson.callContract.contractId,
          );
          let contractStandardType = undefined;

          try {
            const contract = await this.queryBus.execute<
              ContractQuery,
              Contract
            >(new ContractQuery(contractId));
            contractStandardType = contract.contractStandardType;
          } catch {}

          await this.commandBus.execute(
            new CreateContractOperationCommand(
              savedOperation.id.value,
              contractId,
              operationJson.callContract.entryPoint,
              operationJson.callContract.args,
              contractStandardType,
            ),
          );
        }
      }
    }
  }
}
