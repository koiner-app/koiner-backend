import { Command, CommandProps } from '@appvise/domain';

export class CreateContractCommand extends Command {
  constructor(props: CommandProps<CreateContractCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id: string;
  readonly bytecode: string;
  readonly abi?: string;
  readonly contractStandardType?: string;
}
