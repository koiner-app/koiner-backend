import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ContractCreated extends DomainEvent {
  constructor(props: DomainEventProps<ContractCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight: number;
  readonly transactionId: string;
  readonly operationIndex: number;
  readonly contractStandardType?: string;
}
