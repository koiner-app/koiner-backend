import { Command, CommandProps } from '@appvise/domain';

export class ResumeSynchronizationCommand extends Command {
  constructor(props?: CommandProps<ResumeSynchronizationCommand>) {
    super(props ?? {});

    Object.assign(this, props);
  }

  readonly chainId?: string;
  readonly batchSize?: number;
}
