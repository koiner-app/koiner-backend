import { Command, CommandProps } from '@appvise/domain';

export class SyncBlockCommand extends Command {
  constructor(props: CommandProps<SyncBlockCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight: number;
}
