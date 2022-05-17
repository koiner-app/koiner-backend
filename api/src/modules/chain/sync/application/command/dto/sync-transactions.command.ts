import { Command, CommandProps } from '@appvise/domain';

export class SyncTransactionsCommand extends Command {
  constructor(props: CommandProps<SyncTransactionsCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight: number;
}
