import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContractCreated } from '@koiner/contracts/domain';
import { UpdateChainStatsCommand } from '@koiner/chain/application/chain/command/dto/update-chain-stats.command';
import { koinos } from '@config';

@EventsHandler(ContractCreated)
export class UpdateChainStatsOnContractCreated
  implements IEventHandler<ContractCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(): Promise<void> {
    await this.commandBus.execute(
      new UpdateChainStatsCommand(koinos.chainId, {
        contractCount: 1,
      }),
    );
  }
}
