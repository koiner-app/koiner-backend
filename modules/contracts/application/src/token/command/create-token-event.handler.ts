import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  TokenEvent,
  TokenEventWriteRepository,
} from '@koiner/contracts/domain';
import { CreateOrUpdateAddressCommand } from '../../address';
import { CreateTokenEventCommand } from './dto/create-token-event.command';

@CommandHandler(CreateTokenEventCommand)
export class CreateTokenEventHandler
  implements ICommandHandler<CreateTokenEventCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly writeRepository: TokenEventWriteRepository
  ) {}

  async execute(command: CreateTokenEventCommand): Promise<void> {
    if (command.from) {
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand({
          id: command.from,
        })
      );
    }

    if (command.to) {
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand({
          id: command.to,
        })
      );
    }

    const operation = TokenEvent.create(
      {
        contractId: new KoinosAddressId(command.contractId),
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
