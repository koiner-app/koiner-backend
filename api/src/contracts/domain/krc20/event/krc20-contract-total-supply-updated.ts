import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class Krc20ContractTotalSupplyUpdated extends DomainEvent {
  constructor(props: DomainEventProps<Krc20ContractTotalSupplyUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly totalSupply: number;
  readonly mintedTokens: number;
}
