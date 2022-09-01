import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChainWriteRepository } from '@koiner/chain/domain';
import { CompleteInitialSyncCommand } from './dto/complete-initial-sync.command';

@CommandHandler(CompleteInitialSyncCommand)
export class CompleteInitialSyncHandler
  implements ICommandHandler<CompleteInitialSyncCommand>
{
  constructor(private readonly writeRepository: ChainWriteRepository) {}

  async execute(command: CompleteInitialSyncCommand): Promise<void> {
    const chain = await this.writeRepository.findOneByIdOrThrow(command.id);

    chain.completeInitialSync();

    await this.writeRepository.save(chain);
  }
}
