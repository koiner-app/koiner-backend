import { AggregateRoot } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import { AddressCreated, AddressProps, CreateAddressProps } from '.';

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
        isContract: props.isContract,
        isTokenContract: props.isTokenContract,
      })
    );

    return address;
  }

  get isProducer(): boolean {
    return this.props.isProducer;
  }

  get isContract(): boolean {
    return this.props.isContract;
  }

  get isTokenContract(): boolean {
    return this.props.isTokenContract;
  }

  markAsProducer(): void {
    this.props.isProducer = true;
  }

  markAsContract(): void {
    this.props.isContract = true;
  }

  markAsTokenContract(): void {
    this.props.isTokenContract = true;
  }

  validate(): void {
    //
  }
}
