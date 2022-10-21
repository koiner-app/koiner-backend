import { Command, CommandProps } from '@appvise/domain';

export class UndoBlockRewardsFromCheckpointCommand extends Command {
  constructor(props: CommandProps<UndoBlockRewardsFromCheckpointCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly checkPoint!: number;
}
