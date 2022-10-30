import { Command, CommandProps } from '@appvise/domain';

export class CreateStopSignalCommand extends Command {
  constructor(props: CommandProps<CreateStopSignalCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly chainId!: string;
  readonly stopAtHeight?: number;
}
