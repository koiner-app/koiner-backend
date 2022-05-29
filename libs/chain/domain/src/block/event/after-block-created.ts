import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class AfterBlockCreated extends DomainEvent {
  constructor(props: DomainEventProps<AfterBlockCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly height!: number;
  readonly timestamp!: number;
  readonly transactionCount!: number;
}
