import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Krc20OperationCreated } from '@koiner/contracts/domain';
import { UpdateKrc20BalanceCommand } from '../command';

@EventsHandler(Krc20OperationCreated)
export class UpdateKrc20BalancesOnOperationCreated
  implements IEventHandler<Krc20OperationCreated>
{
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: Krc20OperationCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateKrc20BalanceCommand(event.to, event.contractId, event.value),
    );

    if (event.from) {
      await this.commandBus.execute(
        new UpdateKrc20BalanceCommand(
          event.from,
          event.contractId,
          -event.value,
        ),
      );
    }
  }
}
