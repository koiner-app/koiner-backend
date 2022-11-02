import { Command, CommandProps } from '@appvise/domain';

export class CreateTokenOperationCommand extends Command {
  constructor(props: CommandProps<CreateTokenOperationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly blockHeight!: number;
  readonly contractId!: string;
  readonly transactionId!: string;
  readonly name!: string;
  readonly from?: string;
  readonly to?: string;
  readonly value!: number;
  readonly timestamp!: number;
}
