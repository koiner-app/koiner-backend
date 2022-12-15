import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class KoinStatsUpdated extends DomainEvent {
  constructor(props: DomainEventProps<KoinStatsUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly price!: number;
  readonly timestamp!: number;
  readonly bidPrice!: number;
  readonly bidQuantity!: number;
  readonly askPrice!: number;
  readonly askQuantity!: number;
}
