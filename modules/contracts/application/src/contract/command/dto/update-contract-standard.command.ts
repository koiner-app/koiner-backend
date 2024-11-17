import { Command, CommandProps } from '@appvise/domain';
import { ContractStandardType } from '@koiner/contracts/standards';

export class UpdateContractStandardCommand extends Command {
  constructor(props: CommandProps<UpdateContractStandardCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly contractStandardType?: ContractStandardType;
}
