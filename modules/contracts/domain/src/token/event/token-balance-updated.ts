import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenBalanceUpdated extends DomainEvent {
  constructor(props: DomainEventProps<TokenBalanceUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
  readonly amountChanged!: number;
}
