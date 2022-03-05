import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BlockCreated } from '@koiner/chain/domain/block/event/block-created';

@EventsHandler(BlockCreated)
export class UpdateBlockStatsOnProjectCreated
  implements IEventHandler<BlockCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: BlockCreated): Promise<void> {
    // TODO: Do something with event
  }
}
