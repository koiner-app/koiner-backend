import { Command, CommandProps } from '@appvise/domain';

export class UpdateTokenContractCommand extends Command {
  constructor(props: CommandProps<UpdateTokenContractCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId: string;
  readonly mintedTokens?: number;
  readonly stats?: {
    holderCount?: number;
    operationCount?: number;
    mintCount?: number;
    transferCount?: number;
  };
}
