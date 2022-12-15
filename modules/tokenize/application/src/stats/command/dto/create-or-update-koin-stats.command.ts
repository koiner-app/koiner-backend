import { Command, CommandProps } from '@appvise/domain';
import { UpdateKoinStatsProps } from '@koiner/tokenize/domain';

export class CreateOrUpdateKoinStatsCommand extends Command {
  constructor(props: CommandProps<CreateOrUpdateKoinStatsCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly stats!: UpdateKoinStatsProps;
}
