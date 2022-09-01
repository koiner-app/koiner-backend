import { Command, CommandProps } from '@appvise/domain';

export class CompleteInitialSyncCommand extends Command {
  constructor(props: CommandProps<CompleteInitialSyncCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
}
