import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenContractTotalSupplyUpdated extends DomainEvent {
  constructor(props: DomainEventProps<TokenContractTotalSupplyUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly totalSupply: number;
  readonly mintedTokens: number;
}
