import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { CreateSystemCallOperationCommand } from './dto/create-system-call-operation.command';
import {
  SystemCallOperation,
  SystemCallOperationWriteRepository,
} from '@koiner/chain/domain';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(CreateSystemCallOperationCommand)
export class CreateSystemCallOperationHandler
  implements ICommandHandler<CreateSystemCallOperationCommand>
{
  constructor(
    private readonly writeRepository: SystemCallOperationWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateSystemCallOperationCommand): Promise<void> {
    const operation = this.eventPublisher.mergeObjectContext(
      SystemCallOperation.create(
        {
          contractId: new KoinosAddressId(command.contractId),
          callId: command.callId,
        },
        new UUID(command.id),
      ),
    );

    await this.writeRepository.save(operation);

    operation.commit();
  }
}
