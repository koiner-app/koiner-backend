import { Command, CommandProps } from '@appvise/domain';

export class UndoEventsByBlockHeightCommand extends Command {
  constructor(props: CommandProps<UndoEventsByBlockHeightCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeights!: number[];
}
