import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class BlockWithTransactionsCreated extends DomainEvent {
  constructor(props: DomainEventProps<BlockWithTransactionsCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly height!: number;
  readonly timestamp!: number;
  readonly transactionCount!: number;
}
