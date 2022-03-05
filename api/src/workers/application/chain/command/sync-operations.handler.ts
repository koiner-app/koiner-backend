import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Contract, Serializer, utils } from 'koilib';
import { SyncOperationsCommand } from './dto/sync-operations.command';
import { CreateContractCommand } from '@koiner/chain/application/contract/command';
import { CreateAddressCommand } from '@koiner/chain/application/address/command';
import { Inject } from '@nestjs/common';

@CommandHandler(SyncOperationsCommand)
export class SyncOperationsHandler
  implements ICommandHandler<SyncOperationsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    @Inject('ActiveTransactionDataSerializer')
    private readonly activeTransactionDataSerializer: Serializer,
  ) {}

  async execute(command: SyncOperationsCommand): Promise<void> {
    const active = await this.activeTransactionDataSerializer.deserialize(
      command.transaction.active,
    );

    if (Array.isArray(active.operations)) {
      for (
        let operationIndex = 0;
        operationIndex < active.operations.length;
        operationIndex++
      ) {
        const op = active.operations[operationIndex];

        if (op.set_system_call) {
          console.log('set_system_call');
          // TODO: Handle system calls
        } else if (op.set_system_contract_operation) {
          console.log('set_system_contract_operation');
          // TODO: Handle system contract operations
        } else if (op.upload_contract) {
          const contractId = utils.encodeBase58(op.upload_contract.contract_id);

          // Create Address (if not already created). ContractId = address
          await this.commandBus.execute(new CreateAddressCommand(contractId));

          await this.commandBus.execute(
            new CreateContractCommand(
              contractId,
              parseInt(command.blockHeight),
              command.transaction.id,
              operationIndex,
              op.upload_contract.bytecode,
              // abi // TODO: Add abi to contract
            ),
          );
        } else if (op.call_contract) {
          // TODO: Handle call contract
          const contractId = utils.encodeBase58(op.call_contract.contract_id);

          console.log('call_contract', contractId);

          // If operation is krc20 related
          const Krc20Contract = new Contract({
            id: contractId,
            abi: utils.Krc20Abi,
          });

          try {
            const decodedKRC20Operation = await Krc20Contract.decodeOperation(
              op,
            );

            console.log('decodedKRC20Operation', decodedKRC20Operation);
          } catch (error) {
            // Not Krc20Contract
          }
        }
      }
    }
  }
}
