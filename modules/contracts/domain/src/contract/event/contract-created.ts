import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ContractCreated extends DomainEvent {
  constructor(props: DomainEventProps<ContractCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly contractStandardType?: string;
  readonly timestamp!: number;
}
