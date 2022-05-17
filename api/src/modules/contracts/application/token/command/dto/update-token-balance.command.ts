import { Command, CommandProps } from '@appvise/domain';
import { TokensOrigin } from '@koiner/contracts/domain';

export class UpdateTokenBalanceCommand extends Command {
  constructor(props: CommandProps<UpdateTokenBalanceCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId: string;
  readonly contractId: string;
  readonly amountChanged: number;
  readonly tokensOrigin: TokensOrigin;
}
