import { Command, CommandProps } from '@appvise/domain';

export class CreateOrUpdateAddressCommand extends Command {
  constructor(props: CommandProps<CreateOrUpdateAddressCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly isProducer?: boolean = false;
  readonly isContract?: boolean = false;
  readonly isTokenContract?: boolean = false;
}
