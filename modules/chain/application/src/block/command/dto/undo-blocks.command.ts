import { Command, CommandProps } from '@appvise/domain';

export class UndoBlocksCommand extends Command {
  constructor(props: CommandProps<UndoBlocksCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeights!: number[];
}
