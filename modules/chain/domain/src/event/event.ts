import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { CreateEventProps, EventCreated, EventProps } from '.';

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
        aggregateId: props.transactionId.value,
        sequence: props.sequence,
        contractId: props.contractId ? props.contractId.value : undefined,
        name: props.name,
        data: props.data,
        impacted: props.impacted
          ? props.impacted.map((impactedAddress) => impactedAddress.value)
          : undefined,
      })
    );

    return event;
  }

  get transactionId(): KoinosId {
    return this.props.transactionId;
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

  validate(): void {
    //
  }
}
