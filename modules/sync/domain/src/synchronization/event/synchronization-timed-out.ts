import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationTimedOut extends DomainEvent {
  static eventName = 'sync.synchronization.timed-out';

  constructor(props: DomainEventProps<SynchronizationTimedOut>) {
    super(props);

    Object.assign(this, props);
  }

  readonly headTopologyHeight!: number;
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;
  readonly timedOutAt!: number;

  public override toString(): string {
    return JSON.stringify(this);
  }
}
