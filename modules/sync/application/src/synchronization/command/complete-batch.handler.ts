import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynchronizationWriteRepository } from '@koiner/sync/domain';
import { Provider } from 'koilib';
import { CompleteBatchCommand } from './dto/complete-batch.command';

@CommandHandler(CompleteBatchCommand)
export class CompleteBatchHandler
  implements ICommandHandler<CompleteBatchCommand>
{
  constructor(
    private readonly writeRepository: SynchronizationWriteRepository,
    private readonly provider: Provider
  ) {}

  async execute(command: CompleteBatchCommand): Promise<void> {
    const synchronization = await this.writeRepository.findOneByIdOrThrow(
      command.id
    );

    const headInfo = await this.provider.getHeadInfo();

    synchronization.completeBatch({
      headTopologyHeight: parseInt(headInfo.head_topology.height),
      lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
      lastSyncedBlock: command.lastSyncedBlock,
    });

    await this.writeRepository.save(synchronization);
  }
}
