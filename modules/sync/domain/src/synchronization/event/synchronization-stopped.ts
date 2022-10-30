import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationStopped extends DomainEvent {
  static eventName = 'sync.synchronization.stopped';

  constructor(props: DomainEventProps<SynchronizationStopped>) {
    super(props);

    Object.assign(this, props);
  }

  readonly headTopologyHeight!: number;
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;
  readonly stoppedAt!: number;

  public override toString(): string {
    return JSON.stringify(this);
  }
}
