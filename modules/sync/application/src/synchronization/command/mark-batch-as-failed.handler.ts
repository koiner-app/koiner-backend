import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynchronizationWriteRepository } from '@koiner/sync/domain';
import { Provider } from 'koilib';
import { MarkBatchAsFailedCommand } from './dto/mark-batch-as-failed.command';

@CommandHandler(MarkBatchAsFailedCommand)
export class MarkBatchAsFailedHandler
  implements ICommandHandler<MarkBatchAsFailedCommand>
{
  constructor(
    private readonly writeRepository: SynchronizationWriteRepository,
    private readonly provider: Provider
  ) {}

  async execute(command: MarkBatchAsFailedCommand): Promise<void> {
    const synchronization = await this.writeRepository.findOneByIdOrThrow(
      command.id
    );

    const headInfo = await this.provider.getHeadInfo();

    synchronization.markBatchAsFailed({
      headTopologyHeight: parseInt(headInfo.head_topology.height),
      lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
      failedAtBlock: command.failedAtBlock,
      error: command.error,
    });

    await this.writeRepository.save(synchronization);
  }
}
