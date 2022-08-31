import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenHolderUpdated extends DomainEvent {
  constructor(props: DomainEventProps<TokenHolderUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
  readonly amountChanged!: number;
}
