import { Command, CommandProps } from '@appvise/domain';
import { UpdateTokenStatsProps } from '@koiner/tokenize/domain';

export class CreateOrUpdateTokenStatsCommand extends Command {
  constructor(props: CommandProps<CreateOrUpdateTokenStatsCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly stats!: UpdateTokenStatsProps;
}
