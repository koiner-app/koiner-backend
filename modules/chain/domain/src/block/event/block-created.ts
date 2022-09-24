import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockCreated extends DomainEvent {
  constructor(props: DomainEventProps<BlockCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly height!: number;
  readonly timestamp!: number;
  readonly transactionCount!: number;
  readonly signer!: string;
}
