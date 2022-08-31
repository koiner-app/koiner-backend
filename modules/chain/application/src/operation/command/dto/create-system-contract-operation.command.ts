import { Command, CommandProps } from '@appvise/domain';

export class CreateSystemContractOperationCommand extends Command {
  constructor(props: CommandProps<CreateSystemContractOperationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractId!: string;
  readonly systemContract!: boolean;
  readonly timestamp!: number;
}
