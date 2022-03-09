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
import { CreateContractCommand } from '@koiner/chain/application/contract/command';

@CommandHandler(SyncOperationsCommand)
export class SyncOperationsHandler
  implements ICommandHandler<SyncOperationsCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: SyncOperationsCommand): Promise<void> {
    const transactionJson: any = command.transaction;

    // We need both persisted transaction (with operationIds) and transactionJson from JSON-RPC api
    const transaction = await this.queryBus.execute<
      TransactionQuery,
      Transaction
    >(new TransactionQuery(command.transaction.id));

    if (Array.isArray(transaction.operations)) {
      for (
        let operationIndex = 0;
        operationIndex < transaction.operations.length;
        operationIndex++
      ) {
        const savedOperation = transaction.operations[operationIndex];
        const operationJson = transactionJson.operations[operationIndex];

        if (savedOperation.type === OperationType.systemCall) {
          console.log(
            'set_system_call',
            operationJson,
            operationJson.set_system_call,
            operationJson.set_system_call.target,
            operationJson.set_system_call.target.system_call_bundle,
          );

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
          console.log('set_system_contract', operationJson);

          await this.commandBus.execute(
            new CreateSystemContractOperationCommand(
              savedOperation.id.value,
              operationJson.set_system_contract.contract_id,
              operationJson.set_system_contract.system_contract,
            ),
          );
        } else if (savedOperation.type === OperationType.uploadContract) {
          console.log('upload_contract', operationJson);
          const contractId = operationJson.upload_contract.contract_id;

          // Create Address (if not already created). ContractId = address
          await this.commandBus.execute(new CreateAddressCommand(contractId));

          await this.commandBus.execute(
            new CreateUploadContractOperationCommand(
              savedOperation.id.value,
              contractId,
              operationJson.upload_contract.bytecode,
              operationJson.upload_contract.abi,
            ),
          );

          await this.commandBus.execute(
            new CreateContractCommand(
              contractId,
              parseInt(command.blockHeight),
              command.transaction.id,
              operationIndex,
              operationJson.upload_contract.bytecode,
              operationJson.upload_contract.abi,
            ),
          );
        } else if (savedOperation.type === OperationType.contractOperation) {
          console.log('call_contract', operationJson);

          const contractId = operationJson.call_contract.contract_id;

          await this.commandBus.execute(
            new CreateContractOperationCommand(
              savedOperation.id.value,
              contractId,
              operationJson.call_contract.entry_point,
              operationJson.call_contract.args,
            ),
          );
        }
      }
    }
  }
}
