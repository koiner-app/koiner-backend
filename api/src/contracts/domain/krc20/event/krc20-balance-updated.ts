import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20BalanceUpdated extends DomainEvent {
  constructor(props: DomainEventProps<Krc20BalanceUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId: string;
  readonly contractId: string;
  readonly balance: number;
  readonly amountChanged: number;
}
