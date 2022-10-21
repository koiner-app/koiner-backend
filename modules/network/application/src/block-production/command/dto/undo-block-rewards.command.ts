import { Command, CommandProps } from '@appvise/domain';

export class UndoBlockRewardsCommand extends Command {
  constructor(props: CommandProps<UndoBlockRewardsCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeights!: number[];
}
