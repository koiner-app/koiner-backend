import { Command, CommandProps } from '@appvise/domain';

export class SyncBlocksCommand extends Command {
  constructor(props: CommandProps<SyncBlocksCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly startHeight!: number;
  readonly amount!: number;
}
