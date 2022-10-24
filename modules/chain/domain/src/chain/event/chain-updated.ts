import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ChainUpdated extends DomainEvent {
  constructor(props: DomainEventProps<ChainUpdated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly stats!: {
    addressCount: number;
    operationCount: number;
    transactionCount: number;
  };

  readonly timestamp!: number;
}
