import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChainId } from '@koiner/domain';
import { TokenStats, TokenStatsWriteRepository } from '@koiner/tokenize/domain';
import { CreateOrUpdateTokenStatsCommand } from './dto/create-or-update-token-stats.command';

@CommandHandler(CreateOrUpdateTokenStatsCommand)
export class CreateOrUpdateTokenStatsHandler
  implements ICommandHandler<CreateOrUpdateTokenStatsCommand>
{
  constructor(private readonly writeRepository: TokenStatsWriteRepository) {}

  async execute(command: CreateOrUpdateTokenStatsCommand): Promise<void> {
    let tokenStats = await this.writeRepository.findOneById(command.id);

    if (tokenStats) {
      if (command.stats) {
        tokenStats.update(command.stats);
      }

      await this.writeRepository.save(tokenStats);
    }

    if (!tokenStats) {
      tokenStats = TokenStats.create(
        {
          contractCount: command.stats.contractCount ?? 1,
        },
        new ChainId(command.id)
      );

      await this.writeRepository.save(tokenStats);
    }
  }
}
