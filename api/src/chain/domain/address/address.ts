import { AggregateRoot } from '@appvise/domain';
import { AddressCreated, AddressStatistics } from '@koiner/chain/domain';
import { AddressProps, CreateAddressProps } from './address.types';
import { KoinosAddressId } from '@koiner/domain';
import { UpdateAddressStatisticsProps } from '@koiner/chain/domain/address/address-statistics';

export class Address extends AggregateRoot<AddressProps> {
  protected readonly _id: KoinosAddressId;

  static create(create: CreateAddressProps, id: KoinosAddressId): Address {
    const props: AddressProps = {
      ...create,
      stats: AddressStatistics.create(),
    };

    const address = new Address({ id, props });

    address.apply(new AddressCreated(id.value));

    return address;
  }

  get stats(): AddressStatistics {
    return this.props.stats;
  }

  updateStats(props: UpdateAddressStatisticsProps): void {
    this.props.stats.update(props);
  }

  validate(): void {
    //
  }
}
