import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  SystemContractOperation,
  SystemContractOperationWriteRepository,
} from '@koiner/chain/domain';
import { CreateSystemContractOperationCommand } from './dto/create-system-contract-operation.command';

@CommandHandler(CreateSystemContractOperationCommand)
export class CreateSystemContractOperationHandler
  implements ICommandHandler<CreateSystemContractOperationCommand>
{
  constructor(
    private readonly writeRepository: SystemContractOperationWriteRepository
  ) {}

  async execute(command: CreateSystemContractOperationCommand): Promise<void> {
    const operation = SystemContractOperation.create(
      {
        contractId: new KoinosAddressId(command.contractId),
        systemContract: command.systemContract,
      },
      new UUID(command.id),
      command.timestamp
    );

    await this.writeRepository.save(operation);
  }
}
