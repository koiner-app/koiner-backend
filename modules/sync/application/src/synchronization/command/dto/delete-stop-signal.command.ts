import { Command, CommandProps } from '@appvise/domain';

export class DeleteStopSignalCommand extends Command {
  constructor(props: CommandProps<DeleteStopSignalCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly chainId!: string;
}
