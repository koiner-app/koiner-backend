import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Krc20Operation,
  Krc20OperationWriteRepository,
} from '@koiner/contracts/domain';
import { CreateKrc20OperationCommand } from './dto/create-krc20-operation.command';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { UUID } from '@appvise/domain';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';

@CommandHandler(CreateKrc20OperationCommand)
export class CreateKrc20OperationHandler
  implements ICommandHandler<CreateKrc20OperationCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly writeRepository: Krc20OperationWriteRepository,
  ) {}

  async execute(command: CreateKrc20OperationCommand): Promise<void> {
    // Make sure addresses exist
    await this.commandBus.execute(new CreateOrUpdateAddressCommand(command.to));

    if (command.from) {
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand(command.from),
      );
    }

    const operation = Krc20Operation.create(
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
