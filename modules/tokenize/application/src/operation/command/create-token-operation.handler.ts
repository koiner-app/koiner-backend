import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  TokenOperation,
  TokenOperationWriteRepository,
} from '@koiner/tokenize/domain';
import { CreateTokenOperationCommand } from './dto/create-token-operation.command';

@CommandHandler(CreateTokenOperationCommand)
export class CreateTokenOperationHandler
  implements ICommandHandler<CreateTokenOperationCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly writeRepository: TokenOperationWriteRepository
  ) {}

  async execute(command: CreateTokenOperationCommand): Promise<void> {
    const operation = TokenOperation.create(
      {
        blockHeight: command.blockHeight,
        contractId: new KoinosAddressId(command.contractId),
        transactionId: new KoinosId(command.transactionId),
        name: command.name,
        from: command.from ? new KoinosAddressId(command.from) : undefined,
        to: command.to ? new KoinosAddressId(command.to) : undefined,
        value: command.value,
        timestamp: command.timestamp,
      },
      new UUID(command.id)
    );

    await this.writeRepository.save(operation);
  }
}
