import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenContractStatsUpdated extends DomainEvent {
  constructor(props: DomainEventProps<TokenContractStatsUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly holderCount!: number;
  readonly operationCount!: number;
  readonly mintCount!: number;
  readonly transferCount!: number;
}
