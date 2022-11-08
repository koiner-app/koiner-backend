import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProducerCreated,
  BlockProducerProps,
  BlockRewardReceived,
  CreateBlockProducerProps,
} from '.';
import * as math from 'mathjs';

export class BlockProducer extends AggregateRoot<BlockProducerProps> {
  protected readonly _id!: KoinosAddressId;

  static create(create: CreateBlockProducerProps, id: UUID): BlockProducer {
    const props: BlockProducerProps = {
      ...create,
      roi: math
        .chain<number>(create.mintedTotal)
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
        mintedTotal: props.mintedTotal,
        burnedTotal: props.burnedTotal,
      })
    );

    blockProducer.addEvent(
      new BlockRewardReceived({
        aggregateId: id.value,
        isNewProducer: true,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
        rewardsReceived: props.balance,
        mintedValue: props.mintedTotal,
        burnedValue: props.burnedTotal,
        mintedTotal: props.mintedTotal,
        burnedTotal: props.burnedTotal,
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

  get mintedTotal(): number {
    return this.props.mintedTotal;
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

  addRewards(mintedValue: number, burnedValue: number): void {
    const rewards = mintedValue - burnedValue;
    if (rewards < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Rewards must be positive');
    }

    this.props.balance += rewards;
    this.props.mintedTotal += mintedValue;
    this.props.burnedTotal += burnedValue;
    this.props.blocksProduced += 1;
    this.props.roi = math
      .chain<number>(this.mintedTotal)
      .divide(this.burnedTotal)
      .multiply(100)
      .subtract(100)
      .round(5)
      .done() as number;

    this.addEvent(
      new BlockRewardReceived({
        aggregateId: this.id.value,
        isNewProducer: false,
        addressId: this.addressId.value,
        contractId: this.contractId.value,
        balance: this.balance,
        rewardsReceived: rewards,
        mintedValue,
        burnedValue,
        mintedTotal: this.mintedTotal,
        burnedTotal: this.burnedTotal,
      })
    );
  }

  undoRewards(mintedValue: number, burnedValue: number): void {
    this.props.balance -= burnedValue - mintedValue;
    this.props.mintedTotal -= mintedValue;
    this.props.burnedTotal -= burnedValue;
    this.props.blocksProduced -= 1;
  }

  validate(): void {
    //
  }
}
