import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  ContractOperation,
  ContractOperationWriteRepository,
} from '@koiner/contracts/domain';
import { CreateContractOperationCommand } from './dto/create-contract-operation.command';

@CommandHandler(CreateContractOperationCommand)
export class CreateContractOperationHandler
  implements ICommandHandler<CreateContractOperationCommand>
{
  constructor(
    private readonly writeRepository: ContractOperationWriteRepository,
  ) {}

  async execute(command: CreateContractOperationCommand): Promise<void> {
    const operation = ContractOperation.create(
      {
        contractId: new KoinosAddressId(command.contractId),
        transactionId: new KoinosId(command.transactionId),
        entryPoint: command.entryPoint,
        args: command.args,
        contractStandardType: command.contractStandardType,
      },
      new UUID(command.id),
    );

    await this.writeRepository.save(operation);
  }
}
