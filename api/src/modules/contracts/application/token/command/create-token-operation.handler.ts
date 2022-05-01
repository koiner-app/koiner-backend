import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  TokenOperation,
  TokenOperationWriteRepository,
} from '@koiner/contracts/domain';
import { CreateTokenOperationCommand } from './dto/create-token-operation.command';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { UUID } from '@appvise/domain';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';

@CommandHandler(CreateTokenOperationCommand)
export class CreateTokenOperationHandler
  implements ICommandHandler<CreateTokenOperationCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly writeRepository: TokenOperationWriteRepository,
  ) {}

  async execute(command: CreateTokenOperationCommand): Promise<void> {
    // Make sure addresses exist
    await this.commandBus.execute(new CreateOrUpdateAddressCommand(command.to));

    if (command.from) {
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand(command.from),
      );
    }

    const operation = TokenOperation.create(
      {
        contractId: new KoinosAddressId(command.contractId),
        transactionId: command.transactionId
          ? new KoinosId(command.transactionId)
          : undefined,
        name: command.name,
        to: new KoinosAddressId(command.to),
        value: command.value,
        from: command.from ? new KoinosAddressId(command.from) : undefined,
      },
      new UUID(command.id),
    );

    await this.writeRepository.save(operation);
  }
}
