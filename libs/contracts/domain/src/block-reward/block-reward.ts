import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  BlockRewardCreated,
  BlockRewardProps,
  CreateBlockRewardProps,
} from '.';

export class BlockReward extends AggregateRoot<BlockRewardProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateBlockRewardProps, id: UUID): BlockReward {
    const props: BlockRewardProps = {
      ...create,
    };

    const blockReward = new BlockReward({ id, props });

    blockReward.addEvent(
      new BlockRewardCreated({
        aggregateId: id.value,
        blockHeight: blockReward.blockHeight,
        producerId: blockReward.producerId.value,
        value: blockReward.value,
        contractId: blockReward.contractId.value,
      })
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
