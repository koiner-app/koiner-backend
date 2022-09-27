import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockProducerCreated extends DomainEvent {
  constructor(props: DomainEventProps<BlockProducerCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly addressId!: string;
  readonly contractId!: string;
  readonly balance!: number;
}
