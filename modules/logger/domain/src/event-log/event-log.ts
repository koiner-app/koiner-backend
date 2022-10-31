import { AggregateRoot, UUID } from '@appvise/domain';
import { EventLogProps, CreateEventLogProps } from './event-log.types';
import { EventLogCreated } from '.';

export class EventLog extends AggregateRoot<EventLogProps> {
  protected readonly _id!: UUID;

  static create(create: CreateEventLogProps, id?: UUID): EventLog {
    id = id ?? UUID.generate();

    const props: EventLogProps = {
      ...create,
      timestamp: create.timestamp ?? Date.now(),
      count: 1,
    };

    const eventLog = new EventLog({
      id,
      props,
    });

    eventLog.addEvent(
      new EventLogCreated({
        aggregateId: id.value,
        eventName: props.eventName,
        data: props.data,
        itemId: props.itemId,
        itemType: props.itemType,
        timestamp: props.timestamp,
      })
    );

    return eventLog;
  }

  get eventName(): string {
    return this.props.eventName;
  }

  get data(): string | undefined {
    return this.props.data;
  }

  get itemId(): string {
    return this.props.itemId;
  }

  get itemType(): string {
    return this.props.itemType;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  get count(): number {
    return this.props.count;
  }

  addToCount(): void {
    this.props.count += 1;
  }

  override equals(object: EventLog): boolean {
    return (
      this.eventName === object.eventName &&
      this.itemId === object.itemId &&
      this.itemType === object.itemType
    );
  }

  validate(): void {
    //
  }
}
