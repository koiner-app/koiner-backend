import { Command, CommandProps } from '@appvise/domain';

export class CreateOrUpdateChainCommand extends Command {
  constructor(props: CommandProps<CreateOrUpdateChainCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly stats?: {
    addressCount?: number;
    operationCount?: number;
    transactionCount?: number;
  };
}
