import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TokensBurned extends DomainEvent {
  constructor(props: DomainEventProps<TokensBurned>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly from!: string;
  readonly value!: number;
}
