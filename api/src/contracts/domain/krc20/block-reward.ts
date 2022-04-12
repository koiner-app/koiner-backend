import { AggregateRoot, UUID } from '@appvise/domain';
import { CreateBlockRewardProps, BlockRewardProps } from './block-reward.types';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { BlockRewardCreated } from '@koiner/contracts/domain';

export class BlockReward extends AggregateRoot<BlockRewardProps> {
  protected readonly _id: KoinosId;

  static create(create: CreateBlockRewardProps, id: UUID): BlockReward {
    const props: BlockRewardProps = {
      ...create,
    };

    const blockReward = new BlockReward({ id, props });

    blockReward.apply(
      new BlockRewardCreated(
        blockReward.blockHeight,
        blockReward.producerId.value,
        blockReward.value,
        blockReward.contractId.value,
      ),
    );

    return blockReward;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get producerId(): KoinosAddressId {
    return this.props.producerId;
  }

  get value(): number {
    return this.props.value;
  }

  validate(): void {
    // TODO: Add validations
  }
}
