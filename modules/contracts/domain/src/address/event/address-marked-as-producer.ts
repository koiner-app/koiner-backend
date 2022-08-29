import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class AddressMarkedAsProducer extends DomainEvent {
  constructor(props: DomainEventProps<AddressMarkedAsProducer>) {
    super(props);

    Object.assign(this, props);
  }
}
