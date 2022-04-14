import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ChainCreated extends DomainEvent {
  constructor(props: DomainEventProps<ChainCreated>) {
    super(props);

    Object.assign(this, props);
  }
}
