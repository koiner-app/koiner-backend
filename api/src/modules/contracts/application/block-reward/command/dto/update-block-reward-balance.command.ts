import { Command, CommandProps } from '@appvise/domain';

export class UpdateBlockRewardBalanceCommand extends Command {
  constructor(props: CommandProps<UpdateBlockRewardBalanceCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId: string;
  readonly contractId: string;
  readonly amountChanged: number;
}
