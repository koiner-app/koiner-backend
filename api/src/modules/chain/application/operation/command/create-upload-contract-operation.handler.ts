import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { UploadContractOperation } from '@koiner/chain/domain/operation/upload-contract-operation';
import { CreateUploadContractOperationCommand } from '@koiner/chain/application/operation/command/dto/create-upload-contract-operation.command';
import { UploadContractOperationWriteRepository } from '@koiner/chain/domain/operation/repository';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(CreateUploadContractOperationCommand)
export class CreateUploadContractOperationHandler
  implements ICommandHandler<CreateUploadContractOperationCommand>
{
  constructor(
    private readonly writeRepository: UploadContractOperationWriteRepository,
  ) {}

  async execute(command: CreateUploadContractOperationCommand): Promise<void> {
    const operation = UploadContractOperation.create(
      {
        contractId: new KoinosAddressId(command.contractId),
        bytecode: command.bytecode,
        abi: command.abi,
      },
      new UUID(command.id),
    );

    await this.writeRepository.save(operation);
  }
}
