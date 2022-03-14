import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { UploadContractOperation } from '@koiner/chain/domain/operation/upload-contract-operation';
import { CreateUploadContractOperationCommand } from '@koiner/chain/application/operation/command/dto/create-upload-contract-operation.command';
import { UploadContractOperationWriteRepository } from '@koiner/chain/domain/operation/repository/upload-contract-operation.write.repository';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(CreateUploadContractOperationCommand)
export class CreateUploadContractOperationHandler
  implements ICommandHandler<CreateUploadContractOperationCommand>
{
  constructor(
    private readonly writeRepository: UploadContractOperationWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateUploadContractOperationCommand): Promise<void> {
    const operation = this.eventPublisher.mergeObjectContext(
      UploadContractOperation.create(
        {
          contractId: new KoinosAddressId(command.contractId),
          bytecode: command.bytecode,
          abi: command.abi,
          contractStandardType: command.contractStandardType,
        },
        new UUID(command.id),
      ),
    );

    await this.writeRepository.save(operation);

    operation.commit();
  }
}
