import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockRewardCreated extends DomainEvent {
  constructor(props: DomainEventProps<BlockRewardCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockId!: string;
  readonly blockHeight!: number;
  readonly producerId!: string;
  readonly contractId!: string;
  readonly value!: number;
  readonly burnedContractId?: string;
  readonly burnerId?: string;
  readonly burnedValue?: number;
  readonly roi?: number;
  readonly timestamp!: number;
}
