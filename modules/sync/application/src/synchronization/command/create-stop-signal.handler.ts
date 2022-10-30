import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChainId } from '@koiner/domain';
import {
  StopSignal,
  StopSignalWriteRepository,
  SynchronizationReadRepository,
} from '@koiner/sync/domain';
import { CreateStopSignalCommand } from './dto/create-stop-signal.command';

@CommandHandler(CreateStopSignalCommand)
export class CreateStopSignalHandler
  implements ICommandHandler<CreateStopSignalCommand>
{
  constructor(
    private readonly synchronizationReadRepository: SynchronizationReadRepository,
    private readonly writeRepository: StopSignalWriteRepository
  ) {}

  async execute(command: CreateStopSignalCommand): Promise<void> {
    // Make sure synchronization exists
    const synchronization =
      await this.synchronizationReadRepository.findOneByIdOrThrow(
        command.chainId
      );

    const stopSignal = StopSignal.create(
      {
        stopAtHeight:
          command.stopAtHeight ??
          parseInt(synchronization.lastSyncedBlock.toString()) + 1,
      },
      new ChainId(command.chainId)
    );

    this.writeRepository.save(stopSignal);
  }
}
