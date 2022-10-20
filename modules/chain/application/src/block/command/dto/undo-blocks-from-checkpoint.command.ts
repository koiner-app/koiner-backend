import { Command, CommandProps } from '@appvise/domain';

export class UndoBlocksFromCheckpointCommand extends Command {
  constructor(props: CommandProps<UndoBlocksFromCheckpointCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly checkPoint!: number;
}
