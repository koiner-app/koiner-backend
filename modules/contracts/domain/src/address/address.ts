import { AggregateRoot } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  AddressCreated,
  AddressMarkedAsProducer,
  AddressProps,
  CreateAddressProps,
} from '.';

export class Address extends AggregateRoot<AddressProps> {
  protected readonly _id!: KoinosAddressId;

  static create(create: CreateAddressProps, id: KoinosAddressId): Address {
    const props: AddressProps = {
      ...create,
    };

    const address = new Address({ id, props });

    address.addEvent(
      new AddressCreated({
        aggregateId: id.value,
        isProducer: props.isProducer,
      })
    );

    return address;
  }

  get isProducer(): boolean {
    return this.props.isProducer;
  }

  markAsProducer(): void {
    this.props.isProducer = true;

    this.addEvent(
      new AddressMarkedAsProducer({
        aggregateId: this.id.value,
      })
    );
  }

  validate(): void {
    //
  }
}
