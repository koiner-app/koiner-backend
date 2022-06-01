import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenBalanceCreated extends DomainEvent {
  constructor(props: DomainEventProps<TokenBalanceCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
  readonly tokensOrigin!: string;
}
