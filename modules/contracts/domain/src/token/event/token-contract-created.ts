import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenContractCreated extends DomainEvent {
  constructor(props: DomainEventProps<TokenContractCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly name!: string;
  readonly symbol!: string;
  readonly decimals!: number;
  readonly totalSupply!: number;
  readonly timestamp!: number;
}
