import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationBatchFailed extends DomainEvent {
  static eventName = 'sync.synchronization.batch-failed';

  constructor(props: DomainEventProps<SynchronizationBatchFailed>) {
    super(props);

    Object.assign(this, props);
  }

  readonly headTopologyHeight!: number;
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;
  readonly startHeight!: number;
  readonly endHeight!: number;
  readonly batchSize!: number;
  readonly failedAtBlock!: number;
  readonly error!: string;

  public override toString(): string {
    return JSON.stringify(this);
  }
}
