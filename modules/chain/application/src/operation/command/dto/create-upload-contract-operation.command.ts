import { Command, CommandProps } from '@appvise/domain';

export class CreateUploadContractOperationCommand extends Command {
  constructor(props: CommandProps<CreateUploadContractOperationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractId!: string;
  readonly bytecode!: string;
  readonly abi?: string;
}
