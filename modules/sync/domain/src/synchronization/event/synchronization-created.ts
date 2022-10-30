import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationCreated extends DomainEvent {
  static eventName = 'sync.synchronization.created';

  constructor(props: DomainEventProps<SynchronizationCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly headTopologyHeight!: number;
  readonly lastIrreversibleBlock!: number;

  public override toString(): string {
    return JSON.stringify(this);
  }
}
