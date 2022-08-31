import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenHolderCreated extends DomainEvent {
  constructor(props: DomainEventProps<TokenHolderCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
}
