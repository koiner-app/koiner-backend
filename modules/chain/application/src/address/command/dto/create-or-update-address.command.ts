import { Command, CommandProps } from '@appvise/domain';

export class CreateOrUpdateAddressCommand extends Command {
  constructor(props: CommandProps<CreateOrUpdateAddressCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly producedBlock?: boolean = false;
}
