import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class StopSignaled extends DomainEvent {
  static eventName = 'sync.synchronization.stop-signaled';

  constructor(props: DomainEventProps<StopSignaled>) {
    super(props);

    Object.assign(this, props);
  }

  readonly stopAtHeight!: number;

  public override toString(): string {
    return JSON.stringify(this);
  }
}
