import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationBatchStarted extends DomainEvent {
  static eventName = 'sync.synchronization.batch-started';

  constructor(props: DomainEventProps<SynchronizationBatchStarted>) {
    super(props);

    Object.assign(this, props);
  }

  readonly headTopologyHeight!: number;
  readonly lastIrreversibleBlock!: number;
  readonly lastSyncedBlock!: number;
  readonly startHeight!: number;
  readonly endHeight!: number;
  readonly batchSize!: number;

  public override toString(): string {
    return JSON.stringify(this);
  }
}
