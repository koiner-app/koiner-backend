import { AggregateRoot, UUID } from '@appvise/domain';
import { EventProps, CreateEventProps } from './event.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { EventCreated } from '@koiner/chain/domain';
import { ContractStandardType } from '@koiner/contracts/domain';

export class Event extends AggregateRoot<EventProps> {
  protected readonly _id: KoinosId;

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
        contractId: props.contractId.value,
        contractStandardType: props.contractStandardType,
        name: props.name,
        data: props.data,
        impacted: props.impacted.map(
          (impactedAddress) => impactedAddress.value,
        ),
      }),
    );

    return event;
  }

  get transactionId(): KoinosId {
    return this.props.transactionId;
  }

  get sequence(): number {
    return this.props.sequence;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get contractStandardType(): ContractStandardType | undefined {
    return this.props.contractStandardType;
  }

  get name(): string {
    return this.props.name;
  }

  get data(): string {
    return this.props.data;
  }

  get impacted(): KoinosAddressId[] {
    return this.props.impacted;
  }

  validate(): void {
    // TODO: Add validations
  }
}
