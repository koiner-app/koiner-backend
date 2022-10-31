import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { koinosConfig } from '@koinos/jsonrpc';
import {
  Synchronization,
  SynchronizationNotResumableException,
  SynchronizationWriteRepository,
} from '@koiner/sync/domain';
import { StartSynchronizationBatchCommand } from './dto/start-synchronization-batch.command';
import { ResumeSynchronizationCommand } from './dto/resume-synchronization.command';

@CommandHandler(ResumeSynchronizationCommand)
export class ResumeSynchronizationHandler
  implements ICommandHandler<ResumeSynchronizationCommand>
{
  constructor(
    private readonly writeRepository: SynchronizationWriteRepository,
    private readonly commandBus: CommandBus,
    private readonly logger: Logger
  ) {}

  async execute(command: ResumeSynchronizationCommand): Promise<void> {
    const chainId = command.chainId ?? koinosConfig.chainId;

    const synchronization: Synchronization =
      await this.writeRepository.findOneByIdOrThrow(chainId);

    if (!synchronization.stopped) {
      throw new SynchronizationNotResumableException();
    }

    this.logger.log('Resume syncing!');

    synchronization.resume(command.lastSyncedBlock);

    await this.writeRepository.save(synchronization);

    // Start next batch
    await this.commandBus.execute(
      new StartSynchronizationBatchCommand({
        chainId,
        batchSize: command.batchSize,
      })
    );
  }
}
