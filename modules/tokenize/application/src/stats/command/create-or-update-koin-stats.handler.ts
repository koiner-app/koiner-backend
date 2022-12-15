import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChainId } from '@koiner/domain';
import { KoinStats, KoinStatsWriteRepository } from '@koiner/tokenize/domain';
import { CreateOrUpdateKoinStatsCommand } from './dto/create-or-update-koin-stats.command';

@CommandHandler(CreateOrUpdateKoinStatsCommand)
export class CreateOrUpdateKoinStatsHandler
  implements ICommandHandler<CreateOrUpdateKoinStatsCommand>
{
  constructor(private readonly writeRepository: KoinStatsWriteRepository) {}

  async execute(command: CreateOrUpdateKoinStatsCommand): Promise<void> {
    let koinStats = await this.writeRepository.findOneById(command.id);

    if (koinStats) {
      if (command.stats) {
        koinStats.update(command.stats);
      }

      await this.writeRepository.save(koinStats);
    }

    if (!koinStats) {
      koinStats = KoinStats.create(
        {
          price: command.stats.price,
          bidPrice: command.stats.bidPrice,
          bidQuantity: command.stats.bidQuantity,
          askPrice: command.stats.askPrice,
          askQuantity: command.stats.askQuantity,
        },
        new ChainId(command.id)
      );

      await this.writeRepository.save(koinStats);
    }
  }
}
