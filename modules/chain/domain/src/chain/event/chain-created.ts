import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ChainCreated extends DomainEvent {
  constructor(props: DomainEventProps<ChainCreated>) {
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
