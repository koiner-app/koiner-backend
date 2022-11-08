import { Command, CommandProps } from '@appvise/domain';

export class UpdateBlockProductionStatsCommand extends Command {
  constructor(props: CommandProps<UpdateBlockProductionStatsCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly mintedValue!: number;
  readonly burnedValue!: number;
}
