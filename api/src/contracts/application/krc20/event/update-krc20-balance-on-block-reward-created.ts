import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BlockRewardCreated } from '@koiner/contracts/domain';
import { UpdateKrc20BalanceCommand } from '../command';

@EventsHandler(BlockRewardCreated)
export class UpdateKrc20BalanceOnBlockRewardCreated
  implements IEventHandler<BlockRewardCreated>
{
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: BlockRewardCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateKrc20BalanceCommand(
        event.producerId,
        event.contractId,
        event.value,
      ),
    );
  }
}
