import { Command, CommandProps } from '@appvise/domain';

export class StartSynchronizationCommand extends Command {
  constructor(props: CommandProps<StartSynchronizationCommand>) {
    super(props);

    Object.assign(this, props);
  }

  readonly id!: string;
  readonly headTopology!: {
    id: string;
    previous: string;
    height: number;
  };
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;
  readonly syncing!: boolean;
}
