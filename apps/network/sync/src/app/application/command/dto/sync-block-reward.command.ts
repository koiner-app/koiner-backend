import { Command, CommandProps } from '@appvise/domain';

export class SyncBlockRewardCommand extends Command {
  constructor(props: CommandProps<SyncBlockRewardCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight!: number;
}
