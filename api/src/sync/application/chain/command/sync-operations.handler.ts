import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { SyncOperationsCommand } from './dto/sync-operations.command';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
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
    const transactionId = <string>(<unknown>command.transaction.id);

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
              operationJson.set_system_call.target.system_call_bundle.contract_id,
              operationJson.set_system_call.call_id,
            ),
          );
        } else if (
          savedOperation.type === OperationType.systemContractOperation
        ) {
          await this.commandBus.execute(
            new CreateSystemContractOperationCommand(
              savedOperation.id.value,
              operationJson.set_system_contract.contract_id,
              operationJson.set_system_contract.system_contract,
            ),
          );
        } else if (savedOperation.type === OperationType.uploadContract) {
          const contractId = operationJson.upload_contract.contract_id;
          // Create Address (if not already created). ContractId = address
          await this.commandBus.execute(
            new CreateOrUpdateAddressCommand(contractId),
          );

          const contractStandard =
            await this.contractStandardRetriever.getForContract(contractId);

          await this.commandBus.execute(
            new CreateUploadContractOperationCommand(
              savedOperation.id.value,
              contractId,
              operationJson.upload_contract.bytecode,
              operationJson.upload_contract.abi,
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
              operationJson.upload_contract.bytecode,
              operationJson.upload_contract.abi,
              contractStandard
                ? contractStandard.contractStandard.type
                : undefined,
            ),
          );
        } else if (savedOperation.type === OperationType.contractOperation) {
          const contractId = operationJson.call_contract.contract_id;
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
              operationJson.call_contract.entry_point,
              operationJson.call_contract.args,
              contractStandardType,
            ),
          );
        }
      }
    }
  }
}
