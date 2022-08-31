import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenEventCreated extends DomainEvent {
  constructor(props: DomainEventProps<TokenEventCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly name!: string;
  readonly from?: string;
  readonly to?: string;
  readonly value!: number;
  readonly timestamp!: number;
}
