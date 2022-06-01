import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockRewardsReceived extends DomainEvent {
  constructor(props: DomainEventProps<BlockRewardsReceived>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
  readonly rewardsReceived!: number;
}
