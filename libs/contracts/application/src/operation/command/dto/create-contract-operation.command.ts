import { Command, CommandProps } from '@appvise/domain';

export class CreateContractOperationCommand extends Command {
  constructor(props: CommandProps<CreateContractOperationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractId!: string;
  readonly transactionId!: string;
  readonly entryPoint!: number;
  readonly args!: string;
  readonly contractStandardType?: string;
}
