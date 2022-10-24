import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokenStatsUpdated extends DomainEvent {
  constructor(props: DomainEventProps<TokenStatsUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractCount!: number;
  readonly burnCount!: number;
  readonly mintCount!: number;
  readonly transferCount!: number;
}
