import { Command, CommandProps } from '@appvise/domain';

export class CreateTokenContractCommand extends Command {
  constructor(props: CommandProps<CreateTokenContractCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly name!: string;
  readonly symbol!: string;
  readonly decimals!: number;
  readonly timestamp!: number;
}
