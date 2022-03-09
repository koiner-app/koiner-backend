import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { CreateSystemContractOperationCommand } from './dto/create-system-contract-operation.command';
import {
  SystemContractOperation,
  SystemContractOperationWriteRepository,
} from '@koiner/chain/domain';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(CreateSystemContractOperationCommand)
export class CreateSystemContractOperationHandler
  implements ICommandHandler<CreateSystemContractOperationCommand>
{
  constructor(
    private readonly writeRepository: SystemContractOperationWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateSystemContractOperationCommand): Promise<void> {
    const operation = this.eventPublisher.mergeObjectContext(
      SystemContractOperation.create(
        {
          contractId: new KoinosAddressId(command.contractId),
          systemContract: command.systemContract,
        },
        new UUID(command.id),
      ),
    );

    await this.writeRepository.save(operation);

    operation.commit();
  }
}
