import { Command, CommandProps } from '@appvise/domain';

export class CreateSystemCallOperationCommand extends Command {
  constructor(props: CommandProps<CreateSystemCallOperationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractId!: string;
  readonly callId!: number;
}
