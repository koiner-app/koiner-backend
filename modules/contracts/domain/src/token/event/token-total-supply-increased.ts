import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenTotalSupplyIncreased extends DomainEvent {
  constructor(props: DomainEventProps<TokenTotalSupplyIncreased>) {
    super(props);

    Object.assign(this, props);
  }

  readonly name!: string;
  readonly symbol!: string;
  readonly decimals!: number;
  readonly totalSupply!: number;
  readonly amountChanged!: number;
}
