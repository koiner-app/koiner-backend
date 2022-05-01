import { DomainEvent, DomainEventProps } from '@appvise/domain';

export class EventCreated extends DomainEvent {
  constructor(props: DomainEventProps<EventCreated>) {
    super(props);

    Object.assign(this, props);
  }

  readonly sequence: number;
  readonly contractId: string;
  readonly contractStandardType?: string;
  readonly name: string;
  readonly data: string;
  readonly impacted: string[];
}
