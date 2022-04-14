import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20BalanceCreated extends DomainEvent {
  constructor(props: DomainEventProps<Krc20BalanceCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId: string;
  readonly contractId: string;
  readonly balance: number;
}
