import { Command, CommandProps } from '@appvise/domain';

export class CreateEventCommand extends Command {
  constructor(props: CommandProps<CreateEventCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly parentId!: string;
  readonly parentType!: string;
  readonly sequence?: number;
  readonly contractId?: string;
  readonly name!: string;
  readonly data?: string;
  readonly impacted?: string[];
  readonly timestamp!: number;
}
