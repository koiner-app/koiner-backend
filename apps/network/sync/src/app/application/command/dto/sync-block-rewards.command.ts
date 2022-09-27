import { Command, CommandProps } from '@appvise/domain';

export class SyncBlockRewardsCommand extends Command {
  constructor(props: CommandProps<SyncBlockRewardsCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly startHeight!: number;
  readonly amount!: number;
}
