import { Command, CommandProps } from '@appvise/domain';

export class UpdateSynchronizationCommand extends Command {
  constructor(props: CommandProps<UpdateSynchronizationCommand>) {
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
  readonly stopped?: boolean;
}
