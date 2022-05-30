import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  SystemCallOperation,
  SystemCallOperationWriteRepository,
} from '@koiner/chain/domain';
import { CreateSystemCallOperationCommand } from './dto/create-system-call-operation.command';

@CommandHandler(CreateSystemCallOperationCommand)
export class CreateSystemCallOperationHandler
  implements ICommandHandler<CreateSystemCallOperationCommand>
{
  constructor(
    private readonly writeRepository: SystemCallOperationWriteRepository
  ) {}

  async execute(command: CreateSystemCallOperationCommand): Promise<void> {
    const operation = SystemCallOperation.create(
      {
        contractId: new KoinosAddressId(command.contractId),
        callId: command.callId,
      },
      new UUID(command.id)
    );

    await this.writeRepository.save(operation);
  }
}
