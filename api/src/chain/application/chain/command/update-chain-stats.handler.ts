import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ChainWriteRepository } from '@koiner/chain/domain';
import { UpdateChainStatsCommand } from './dto/update-chain-stats.command';

@CommandHandler(UpdateChainStatsCommand)
export class UpdateChainStatsHandler
  implements ICommandHandler<UpdateChainStatsCommand>
{
  constructor(
    private readonly writeRepository: ChainWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: UpdateChainStatsCommand): Promise<void> {
    const chain = this.eventPublisher.mergeObjectContext(
      await this.writeRepository.findOneByIdOrThrow(command.chainId),
    );

    chain.updateStats(command.stats);

    await this.writeRepository.save(chain);

    chain.commit();
  }
}