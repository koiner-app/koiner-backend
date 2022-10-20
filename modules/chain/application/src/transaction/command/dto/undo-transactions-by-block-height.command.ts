import { Command, CommandProps } from '@appvise/domain';

export class UndoTransactionsByBlockHeightCommand extends Command {
  constructor(props: CommandProps<UndoTransactionsByBlockHeightCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeights!: number[];
}
