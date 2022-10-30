import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationResumed extends DomainEvent {
  static eventName = 'sync.synchronization.resumed';

  constructor(props: DomainEventProps<SynchronizationResumed>) {
    super(props);

    Object.assign(this, props);
  }

  readonly headTopologyHeight!: number;
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;

  public override toString(): string {
    return JSON.stringify(this);
  }
}
