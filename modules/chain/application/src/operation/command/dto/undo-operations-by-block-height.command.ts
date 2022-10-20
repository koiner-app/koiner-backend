import { Command, CommandProps } from '@appvise/domain';

export class UndoOperationsByBlockHeightCommand extends Command {
  constructor(props: CommandProps<UndoOperationsByBlockHeightCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeights!: number[];
}
