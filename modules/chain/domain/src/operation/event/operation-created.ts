import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class OperationCreated extends DomainEvent {
  constructor(props: DomainEventProps<OperationCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight!: number;
  readonly transactionId!: string;
  readonly operationIndex!: number;
  readonly type!: string;
  readonly timestamp!: number;
}
