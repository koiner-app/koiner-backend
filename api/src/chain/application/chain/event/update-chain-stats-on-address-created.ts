import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { AddressCreated } from '@koiner/chain/domain';
import { UpdateChainStatsCommand } from '@koiner/chain/application/chain/command/dto/update-chain-stats.command';
import { koinos } from '@config';

export class UpdateChainStatsOnAddressCreated extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(AddressCreated);
  }

  async handle(): Promise<void> {
    await this.commandBus.execute(
      new UpdateChainStatsCommand(koinos.chainId, {
        addressCount: 1,
      }),
    );
  }
}
