import { Command, CommandProps } from '@appvise/domain';

export class StartSynchronizationBatchCommand extends Command {
  constructor(props: CommandProps<StartSynchronizationBatchCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly chainId!: string;
  readonly batchSize?: number;
}
