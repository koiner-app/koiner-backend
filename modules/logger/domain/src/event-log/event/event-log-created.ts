import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class EventLogCreated extends DomainEvent {
  constructor(props: DomainEventProps<EventLogCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly eventName!: string;
  readonly data?: string;
  readonly itemId!: string;
  readonly itemType!: string;
  readonly timestamp!: number;
}
