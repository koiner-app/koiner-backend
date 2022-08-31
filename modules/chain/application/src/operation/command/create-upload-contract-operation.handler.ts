import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  UploadContractOperation,
  UploadContractOperationWriteRepository,
} from '@koiner/chain/domain';
import { CreateUploadContractOperationCommand } from './dto/create-upload-contract-operation.command';

@CommandHandler(CreateUploadContractOperationCommand)
export class CreateUploadContractOperationHandler
  implements ICommandHandler<CreateUploadContractOperationCommand>
{
  constructor(
    private readonly writeRepository: UploadContractOperationWriteRepository
  ) {}

  async execute(command: CreateUploadContractOperationCommand): Promise<void> {
    const operation = UploadContractOperation.create(
      {
        contractId: new KoinosAddressId(command.contractId),
        bytecode: command.bytecode,
        abi: command.abi,
      },
      new UUID(command.id),
      command.timestamp
    );

    await this.writeRepository.save(operation);
  }
}
