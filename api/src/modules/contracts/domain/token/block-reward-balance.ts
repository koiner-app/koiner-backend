import { AggregateRoot, ConflictException, UUID } from '@appvise/domain';
import {
  CreateBlockRewardBalanceProps,
  BlockRewardBalanceCreated,
  BlockRewardBalanceProps,
} from '.';
import { KoinosAddressId } from '@koiner/domain';
import { BlockRewardsReceived } from './event/block-rewards-received';

export class BlockRewardBalance extends AggregateRoot<BlockRewardBalanceProps> {
  protected readonly _id: KoinosAddressId;

  static create(
    create: CreateBlockRewardBalanceProps,
    id: UUID,
  ): BlockRewardBalance {
    const props: BlockRewardBalanceProps = {
      ...create,
    };

    const blockRewardBalance = new BlockRewardBalance({ id, props });

    blockRewardBalance.addEvent(
      new BlockRewardBalanceCreated({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
      }),
    );

    blockRewardBalance.addEvent(
      new BlockRewardsReceived({
        aggregateId: id.value,
        addressId: props.addressId.value,
        contractId: props.contractId.value,
        balance: props.balance,
        rewardsReceived: props.balance,
      }),
    );

    return blockRewardBalance;
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

  addRewards(rewards: number): void {
    if (rewards < 0) {
      // TODO: Add custom exception
      throw new ConflictException('Rewards must be positive');
    }

    this.props.balance += rewards;

    this.addEvent(
      new BlockRewardsReceived({
        aggregateId: this.id.value,
        addressId: this.props.addressId.value,
        contractId: this.props.contractId.value,
        balance: this.props.balance,
        rewardsReceived: rewards,
      }),
    );
  }

  validate(): void {
    //
  }
}
