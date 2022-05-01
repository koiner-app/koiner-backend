import { Command, CommandProps } from '@appvise/domain';

export class CreateEventCommand extends Command {
  constructor(props: CommandProps<CreateEventCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly transactionId: string;
  readonly sequence: number;
  readonly contractId: string;
  readonly contractStandard?: string;
  readonly name: string;
  readonly data: string;
  readonly impacted: string[];
}
