import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChainId } from '@koiner/domain';
import { Chain, ChainStats, ChainWriteRepository } from '@koiner/chain/domain';
import { CreateOrUpdateChainCommand } from './dto/create-or-update-chain.command';

@CommandHandler(CreateOrUpdateChainCommand)
export class CreateOrUpdateChainHandler
  implements ICommandHandler<CreateOrUpdateChainCommand>
{
  constructor(private readonly writeRepository: ChainWriteRepository) {}

  async execute(command: CreateOrUpdateChainCommand): Promise<void> {
    let chain = await this.writeRepository.findOneById(command.id);

    if (chain) {
      if (command.stats) {
        chain.updateStats(command.stats);
      }

      await this.writeRepository.save(chain);
    }

    if (!chain) {
      chain = Chain.create(
        {
          stats: new ChainStats({
            addressCount: command.stats?.addressCount ?? 0,
            operationCount: command.stats?.operationCount ?? 0,
            transactionCount: command.stats?.transactionCount ?? 0,
          }),
        },
        new ChainId(command.id)
      );

      await this.writeRepository.save(chain);
    }
  }
}
