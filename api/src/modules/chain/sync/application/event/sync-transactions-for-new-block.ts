import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { BlockWithTransactionsCreated } from '@koiner/chain/domain';
import { SyncTransactionsCommand } from '@koiner/chain/sync/application/command';

export class SyncTransactionsForNewBlock extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(BlockWithTransactionsCreated);
  }

  async handle(event: BlockWithTransactionsCreated): Promise<void> {
    await this.commandBus.execute(new SyncTransactionsCommand(event.height));
  }
}
