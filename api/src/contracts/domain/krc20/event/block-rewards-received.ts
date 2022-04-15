import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockRewardsReceived extends DomainEvent {
  constructor(props: DomainEventProps<BlockRewardsReceived>) {
    super(props);

    Object.assign(this, props);
  }

  readonly rewardsReceived: number;
  readonly totalRewardsReceived: number;
}
