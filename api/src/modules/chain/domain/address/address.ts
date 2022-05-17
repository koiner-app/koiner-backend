import { AggregateRoot } from '@appvise/domain';
import { AddressCreated } from '@koiner/chain/domain';
import { KoinosAddressId } from '@koiner/domain';
import { AddressProps, CreateAddressProps } from '.';

export class Address extends AggregateRoot<AddressProps> {
  protected readonly _id: KoinosAddressId;

  static create(create: CreateAddressProps, id: KoinosAddressId): Address {
    const props: AddressProps = {
      ...create,
    };

    const address = new Address({ id, props });

    address.addEvent(
      new AddressCreated({
        aggregateId: id.value,
      }),
    );

    return address;
  }

  get isProducer(): boolean {
    return this.props.isProducer;
  }

  markAsProducer(): void {
    this.props.isProducer = true;
  }

  validate(): void {
    //
  }
}
