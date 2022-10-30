import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationBatchCompleted extends DomainEvent {
  static eventName = 'sync.synchronization.batch-completed';

  constructor(props: DomainEventProps<SynchronizationBatchCompleted>) {
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
