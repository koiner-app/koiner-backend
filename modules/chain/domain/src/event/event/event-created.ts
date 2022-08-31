import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class EventCreated extends DomainEvent {
  constructor(props: DomainEventProps<EventCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly parentId!: string;
  readonly parentType!: string;
  readonly sequence?: number;
  readonly contractId?: string;
  readonly name!: string;
  readonly data?: string;
  readonly impacted?: string[];
  readonly timestamp!: number;
}
