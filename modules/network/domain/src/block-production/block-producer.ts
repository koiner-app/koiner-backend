import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProducerCreated,
  BlockProducerProps,
  BlockRewardsReceived,
  CreateBlockProducerProps,
} from '.';

export class BlockProducer extends AggregateRoot<BlockProducerProps> {
  protected readonly _id!: KoinosAddressId;

  static create(create: CreateBlockProducerProps, id: UUID): BlockProducer {
    const props: BlockProducerProps = {
      ...create,
      blocksProduced: 1,
    };

    const blockProducer = new BlockProducer({ id, props });

    blockProducer.addEvent(
      new BlockProducerCreated({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
      })
    );

    blockProducer.addEvent(
      new BlockRewardsReceived({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
        rewardsReceived: props.balance,
      })
    );

    return blockProducer;
  }

  get addressId(): KoinosAddressId {
    return this.props.addressId;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get balance(): number {
    return this.props.balance;
  }

  get blocksProduced(): number {
    return this.props.blocksProduced;
  }

  addRewards(rewards: number): void {
    if (rewards < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Rewards must be positive');
    }

    this.props.balance += rewards;
    this.props.blocksProduced += 1;

    this.addEvent(
      new BlockRewardsReceived({
        aggregateId: this.id.value,
        addressId: this.props.addressId.value,
        contractId: this.props.contractId.value,
        balance: this.props.balance,
        rewardsReceived: rewards,
      })
    );
  }

  undoRewards(rewards: number): void {
    this.props.balance -= rewards;
    this.props.blocksProduced -= 1;
  }

  validate(): void {
    //
  }
}
