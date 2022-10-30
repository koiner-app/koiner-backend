import { DomainEventHandler } from '@appvise/domain';
import { CommandBus } from '@nestjs/cqrs';
import { SynchronizationStopped } from '@koiner/sync/domain';
import { DeleteStopSignalCommand } from '../command';

export class RemoveStopSignalOnSynchronizationStopped extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(SynchronizationStopped);
  }

  async handle(event: SynchronizationStopped): Promise<void> {
    await this.commandBus.execute(
      new DeleteStopSignalCommand({
        chainId: event.aggregateId,
      })
    );
  }
}
