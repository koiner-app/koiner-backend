import { Command, CommandProps } from '@appvise/domain';

export class MarkBatchAsFailedCommand extends Command {
  constructor(props: CommandProps<MarkBatchAsFailedCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly failedAtBlock!: number;
  readonly error!: string;
}
