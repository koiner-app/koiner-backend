import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BlockCreated } from '@koiner/chain/domain/block/event/block-created';

@EventsHandler(BlockCreated)
export class UpdateBlockStatsOnProjectCreated
  implements IEventHandler<BlockCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: BlockCreated): Promise<void> {
    console.log('BlockCreated', event);
    // await this.commandBus.execute(
    //   new UpdateBlockStatsCommand(event.blockId, {
    //     projectCount: 1,
    //   }),
    // );
  }
}
