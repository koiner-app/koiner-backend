import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StopSignalWriteRepository } from '@koiner/sync/domain';
import { DeleteStopSignalCommand } from './dto/delete-stop-signal.command';

@CommandHandler(DeleteStopSignalCommand)
export class DeleteStopSignalHandler
  implements ICommandHandler<DeleteStopSignalCommand>
{
  constructor(private readonly writeRepository: StopSignalWriteRepository) {}

  async execute(command: DeleteStopSignalCommand): Promise<void> {
    const stopSignal = await this.writeRepository.findOneById(command.chainId);

    if (stopSignal) {
      this.writeRepository.delete(stopSignal);
    }
  }
}
