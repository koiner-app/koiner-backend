import { AggregateRoot } from '@appvise/domain';
import { AddressCreated, AddressStatistics } from '@koiner/chain/domain';
import { AddressProps, CreateAddressProps } from './address.types';
import { KoinosAddressId } from '@koiner/domain';
import { UpdateAddressStatisticsProps } from '@koiner/chain/domain/address/address-statistics';
import { BlockRewardsReceived } from '@koiner/chain/domain/address/event/block-rewards-received';

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

  get rewardsReceived(): number {
    return this.props.rewardsReceived;
  }

  get stats(): AddressStatistics {
    return this.props.stats;
  }

  markAsProducer(): void {
    this.props.isProducer = true;
  }

  addRewards(rewards: number): void {
    this.props.rewardsReceived += rewards;

    this.addEvent(
      new BlockRewardsReceived({
        aggregateId: this.id.value,
        rewardsReceived: rewards,
        totalRewardsReceived: this.props.rewardsReceived,
      }),
    );
  }

  updateStats(props: UpdateAddressStatisticsProps): void {
    this.props.stats.update(props);
  }

  validate(): void {
    //
  }
}
