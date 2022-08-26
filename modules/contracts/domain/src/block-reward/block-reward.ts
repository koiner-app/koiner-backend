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
        contractId: blockReward.contractId.value,
        value: blockReward.value,
        burnedContractId: blockReward.burnedContractId
          ? blockReward.burnedContractId.value
          : undefined,
        burnerId: blockReward.burnerId ? blockReward.burnerId.value : undefined,
        burnedValue: blockReward.burnedValue,
      })
    );

    return blockReward;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get producerId(): KoinosAddressId {
    return this.props.producerId;
  }

  get contractId(): KoinosAddressId {
    return this.props.contractId;
  }

  get value(): number {
    return this.props.value;
  }

  get burnedContractId(): KoinosAddressId | undefined {
    return this.props.burnedContractId;
  }

  get burnerId(): KoinosAddressId | undefined {
    return this.props.burnerId;
  }

  get burnedValue(): number | undefined {
    return this.props.burnedValue;
  }

  validate(): void {
    // TODO: Add validations
  }
}
