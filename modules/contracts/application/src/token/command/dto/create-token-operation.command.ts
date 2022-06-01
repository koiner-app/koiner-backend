import { Command, CommandProps } from '@appvise/domain';

export class CreateTokenOperationCommand extends Command {
  constructor(props: CommandProps<CreateTokenOperationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractId!: string;
  readonly name!: string;
  readonly to!: string;
  readonly value!: number;
  readonly from?: string;
  readonly transactionId?: string;
}
