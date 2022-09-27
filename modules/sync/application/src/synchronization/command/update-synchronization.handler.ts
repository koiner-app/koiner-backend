import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlockTopology, KoinosId } from '@koiner/domain';
import { SynchronizationWriteRepository } from '@koiner/sync/domain';
import { UpdateSynchronizationCommand } from './dto/update-synchronization.command';

@CommandHandler(UpdateSynchronizationCommand)
export class UpdateSynchronizationHandler
  implements ICommandHandler<UpdateSynchronizationCommand>
{
  constructor(
    private readonly writeRepository: SynchronizationWriteRepository
  ) {}

  async execute(command: UpdateSynchronizationCommand): Promise<void> {
    const synchronization = await this.writeRepository.findOneByIdOrThrow(
      command.id
    );

    synchronization.update({
      headTopology: new BlockTopology({
        id: new KoinosId(command.headTopology.id),
        height: command.headTopology.height,
        previous: command.headTopology.previous,
      }),
      lastIrreversibleBlock: command.lastIrreversibleBlock,
      lastSyncedBlock: command.lastSyncedBlock,
      syncing: command.syncing,
      stopped: command.stopped ?? false,
    });

    await this.writeRepository.save(synchronization);
  }
}
