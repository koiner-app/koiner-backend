import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  EventReadRepository,
  EventWriteRepository,
} from '@koiner/chain/domain';
import { UndoEventsByBlockHeightCommand } from './dto/undo-events-by-block-height.command';

@CommandHandler(UndoEventsByBlockHeightCommand)
export class UndoEventsByBlockHeightHandler
  implements ICommandHandler<UndoEventsByBlockHeightCommand>
{
  constructor(
    private readonly readRepository: EventReadRepository,
    private readonly writeRepository: EventWriteRepository
  ) {}

  async execute(command: UndoEventsByBlockHeightCommand): Promise<void> {
    if (command.blockHeights.length === 0) {
      return;
    }

    const events = await this.readRepository.find({
      first: 100000,
      filter: {
        OR: command.blockHeights.map((blockHeight) => {
          return {
            blockHeight: { equals: blockHeight },
          };
        }),
      },
    });

    for (const event of events.results) {
      await this.writeRepository.delete(event.item);
    }
  }
}
