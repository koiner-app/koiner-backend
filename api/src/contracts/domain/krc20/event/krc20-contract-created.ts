import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20ContractCreated extends DomainEvent {
  constructor(props: DomainEventProps<Krc20ContractCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly totalSupply: number;
}
