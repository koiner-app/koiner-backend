import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockProducerUpdated extends DomainEvent {
  constructor(props: DomainEventProps<BlockProducerUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
  readonly amountChanged!: number;
}
