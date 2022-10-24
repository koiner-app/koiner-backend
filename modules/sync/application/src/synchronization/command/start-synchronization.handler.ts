import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlockTopology, ChainId, KoinosId } from '@koiner/domain';
import {
  Synchronization,
  SynchronizationWriteRepository,
} from '@koiner/sync/domain';
import { StartSynchronizationCommand } from './dto/start-synchronization.command';

@CommandHandler(StartSynchronizationCommand)
export class StartSynchronizationHandler
  implements ICommandHandler<StartSynchronizationCommand>
{
  constructor(
    private readonly writeRepository: SynchronizationWriteRepository
  ) {}

  async execute(command: StartSynchronizationCommand): Promise<void> {
    if (!(await this.writeRepository.existsById(command.id))) {
      const synchronization = Synchronization.create(
        {
          headTopology: new BlockTopology({
            id: new KoinosId(command.headTopology.id),
            height: command.headTopology.height,
            previous: command.headTopology.previous,
          }),
          lastIrreversibleBlock: command.lastIrreversibleBlock,
          lastSyncedBlock: command.lastSyncedBlock,
          syncing: command.syncing,
        },
        new ChainId(command.id)
      );

      await this.writeRepository.save(synchronization);
    }
  }
}
