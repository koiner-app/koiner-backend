import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockRewardCreated extends DomainEvent {
  constructor(props: DomainEventProps<BlockRewardCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight: number;
  readonly producerId: string;
  readonly value: number;
  readonly contractId: string;
}
