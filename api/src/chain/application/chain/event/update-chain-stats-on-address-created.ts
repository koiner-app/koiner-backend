import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddressCreated } from '@koiner/chain/domain';
import { UpdateChainStatsCommand } from '@koiner/chain/application/chain/command/dto/update-chain-stats.command';
import { koinos } from '@config';

@EventsHandler(AddressCreated)
export class UpdateChainStatsOnAddressCreated
  implements IEventHandler<AddressCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(): Promise<void> {
    await this.commandBus.execute(
      new UpdateChainStatsCommand(koinos.mainChainId, {
        addressCount: 1,
      }),
    );
  }
}
