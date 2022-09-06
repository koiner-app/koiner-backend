import { AggregateRoot, ArgumentInvalidException, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { CreateEventProps, EventCreated, EventParentType, EventProps } from '.';

export class Event extends AggregateRoot<EventProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateEventProps, id?: UUID): Event {
    const props: EventProps = {
      ...create,
    };

    id = id ?? UUID.generate();
    const event = new Event({ id, props });

    event.addEvent(
      new EventCreated({
        aggregateId: id.value,
        blockHeight: props.blockHeight,
        parentId: props.parentId.value,
        parentType: props.parentType,
        sequence: props.sequence,
        contractId: props.contractId ? props.contractId.value : undefined,
        name: props.name,
        data: props.data,
        impacted: props.impacted
          ? props.impacted.map((impactedAddress) => impactedAddress.value)
          : undefined,
        timestamp: props.timestamp,
      })
    );

    return event;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get parentId(): KoinosId {
    return this.props.parentId;
  }

  get parentType(): EventParentType {
    return this.props.parentType;
  }

  get sequence(): number | undefined {
    return this.props.sequence;
  }

  get contractId(): KoinosAddressId | undefined {
    return this.props.contractId;
  }

  get name(): string {
    return this.props.name;
  }

  get data(): string | undefined {
    return this.props.data;
  }

  get impacted(): KoinosAddressId[] | undefined {
    return this.props.impacted;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    const parentTypeKeys = Object.keys(EventParentType);

    if (!parentTypeKeys.includes(this.props.parentType)) {
      throw new ArgumentInvalidException(
        'parentType is not a valid EventParentType'
      );
    }
  }
}
