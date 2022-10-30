import { Command, CommandProps } from '@appvise/domain';

export class CompleteBatchCommand extends Command {
  constructor(props: CommandProps<CompleteBatchCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly lastSyncedBlock!: number;
}
