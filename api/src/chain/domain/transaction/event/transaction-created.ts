import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class TransactionCreated extends DomainEvent {
  constructor(props: DomainEventProps<TransactionCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight: number;
  readonly payer: string;
  readonly operationCount: number;
}
