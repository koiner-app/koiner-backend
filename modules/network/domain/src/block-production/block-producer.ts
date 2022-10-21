import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProducerCreated,
  BlockProducerProps,
  BlockRewardsReceived,
  CreateBlockProducerProps,
} from '.';
import * as math from 'mathjs';

export class BlockProducer extends AggregateRoot<BlockProducerProps> {
  protected readonly _id!: KoinosAddressId;

  static create(create: CreateBlockProducerProps, id: UUID): BlockProducer {
    const props: BlockProducerProps = {
      ...create,
      roi: math
        .chain<number>(create.balance)
        .divide(create.burnedTotal)
        .multiply(100)
        .subtract(100)
        .round(5)
        .done() as number,
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

  get burnedTotal(): number {
    return this.props.burnedTotal;
  }

  get roi(): number {
    return this.props.roi;
  }

  get blocksProduced(): number {
    return this.props.blocksProduced;
  }

  addRewards(rewards: number, burnedValue: number): void {
    if (rewards < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Rewards must be positive');
    }

    this.props.balance += rewards;
    this.props.burnedTotal += burnedValue;
    this.props.blocksProduced += 1;
    this.props.roi = math
      .chain<number>(this.balance)
      .divide(this.burnedTotal)
      .multiply(100)
      .subtract(100)
      .round(5)
      .done() as number;

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

  undoRewards(rewards: number, burnedValue: number): void {
    this.props.balance -= rewards;
    this.props.burnedTotal -= burnedValue;
    this.props.blocksProduced -= 1;
  }

  validate(): void {
    //
  }
}
