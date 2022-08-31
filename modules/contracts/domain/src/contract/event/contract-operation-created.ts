import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ContractOperationCreated extends DomainEvent {
  constructor(props: DomainEventProps<ContractOperationCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractId!: string;
  readonly transactionId!: string;
  readonly entryPoint!: number;
  readonly args!: string;
  readonly contractStandardType?: string;
  readonly timestamp!: number;
}
