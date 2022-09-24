import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class AddressCreated extends DomainEvent {
  constructor(props: DomainEventProps<AddressCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly isProducer!: boolean;
  readonly isContract!: boolean;
  readonly isTokenContract!: boolean;
}
