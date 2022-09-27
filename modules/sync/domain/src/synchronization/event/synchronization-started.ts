import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class SynchronizationStarted extends DomainEvent {
  constructor(props: DomainEventProps<SynchronizationStarted>) {
    super(props);

    Object.assign(this, props);
  }
}
