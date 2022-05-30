import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockRewardBalanceCreated extends DomainEvent {
  constructor(props: DomainEventProps<BlockRewardBalanceCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
}
