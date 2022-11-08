import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockRewardReceived extends DomainEvent {
  constructor(props: DomainEventProps<BlockRewardReceived>) {
    super(props);

    Object.assign(this, props);
  }

  readonly isNewProducer!: boolean;
  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
  readonly rewardsReceived!: number;
  readonly mintedValue!: number;
  readonly burnedValue!: number;
  readonly mintedTotal!: number;
  readonly burnedTotal!: number;
}
