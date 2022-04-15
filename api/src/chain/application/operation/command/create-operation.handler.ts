import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { CreateOperationCommand } from './dto/create-operation.command';
import { Operation, OperationWriteRepository } from '@koiner/chain/domain';
import { KoinosId } from '@koiner/domain';

@CommandHandler(CreateOperationCommand)
export class CreateOperationHandler
  implements ICommandHandler<CreateOperationCommand>
{
  constructor(private readonly writeRepository: OperationWriteRepository) {}

  async execute(command: CreateOperationCommand): Promise<void> {
    const operation = Operation.create(
      {
        blockHeight: command.blockHeight,
        transactionId: new KoinosId(command.transactionId),
        operationIndex: command.operationIndex,
        type: command.type,
      },
      UUID.generate(),
    );

    await this.writeRepository.save(operation, true);
  }
}
