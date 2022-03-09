import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  Krc20Operation,
  Krc20OperationWriteRepository,
} from '@koiner/contracts/domain';
import { CreateKrc20OperationCommand } from './create-krc20-operation.command';
import { KoinosAddressId } from '@koiner/domain';
import { UUID } from '@appvise/domain';

@CommandHandler(CreateKrc20OperationCommand)
export class CreateKrc20OperationHandler
  implements ICommandHandler<CreateKrc20OperationCommand>
{
  constructor(
    private readonly writeRepository: Krc20OperationWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateKrc20OperationCommand): Promise<void> {
    const operation = this.eventPublisher.mergeObjectContext(
      Krc20Operation.create(
        {
          name: command.name,
          from: new KoinosAddressId(command.from),
          to: new KoinosAddressId(command.to),
          value: command.value,
        },
        new UUID(command.id),
      ),
    );

    await this.writeRepository.save(operation);

    operation.commit();
  }
}
