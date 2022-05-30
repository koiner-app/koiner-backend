import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ChainUpdated extends DomainEvent {
  constructor(props: DomainEventProps<ChainUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly height!: number;
  readonly previous!: string;
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;
}
