import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class ContractEventCreated extends DomainEvent {
  constructor(props: DomainEventProps<ContractEventCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly blockHeight!: number;
  readonly parentId!: string;
  readonly parentType!: string;
  readonly sequence?: number;
  readonly contractId!: string;
  readonly contractStandardType?: string;
  readonly name!: string;
  readonly data!: string;
  readonly impacted?: string[];
  readonly timestamp!: number;
}
