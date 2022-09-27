import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationUpdated extends DomainEvent {
  constructor(props: DomainEventProps<SynchronizationUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly height!: number;
  readonly previous!: string;
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;
}
