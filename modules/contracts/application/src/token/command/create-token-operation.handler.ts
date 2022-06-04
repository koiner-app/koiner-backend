import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  TokenOperation,
  TokenOperationWriteRepository,
} from '@koiner/contracts/domain';
import { CreateOrUpdateAddressCommand } from '../../address';
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
    await this.commandBus.execute(
      new CreateOrUpdateAddressCommand({
        id: command.to,
      })
    );

    if (command.from) {
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand({
          id: command.from,
        })
      );
    }

    const operation = TokenOperation.create(
      {
        contractId: new KoinosAddressId(command.contractId),
        transactionId: new KoinosId(command.transactionId),
        name: command.name,
        to: new KoinosAddressId(command.to),
        value: command.value,
        from: command.from ? new KoinosAddressId(command.from) : undefined,
      },
      new UUID(command.id)
    );

    await this.writeRepository.save(operation);
  }
}
