import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  BlockRewardCreated,
  BlockRewardProps,
  CreateBlockRewardProps,
} from '.';
import { koinosConfig } from '@koinos/jsonrpc';

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
        blockId: blockReward.blockId.value,
        blockHeight: blockReward.blockHeight,
        producerId: blockReward.producerId.value,
        value: blockReward.value,
        contractId: blockReward.contractId.value,
        burnerId: blockReward.burnerId ? blockReward.burnerId.value : undefined,
        burnedValue: blockReward.burnedValue,
        burnedContractId: blockReward.burnedContractId.value,
        roi: blockReward.roi,
        timestamp: props.timestamp,
      })
    );

    return blockReward;
  }

  get blockId(): KoinosId {
    return this.props.blockId;
  }

  get blockHeight(): number {
    return this.props.blockHeight;
  }

  get producerId(): KoinosAddressId {
    return this.props.producerId;
  }

  get contractId(): KoinosAddressId {
    return new KoinosAddressId(koinosConfig.contracts.koin);
  }

  get value(): number {
    return this.props.value;
  }

  get burnedContractId(): KoinosAddressId {
    return new KoinosAddressId(koinosConfig.contracts.vhp);
  }

  get burnerId(): KoinosAddressId | undefined {
    return this.props.burnerId;
  }

  get burnedValue(): number | undefined {
    return this.props.burnedValue;
  }

  get roi(): number | undefined {
    return this.props.roi;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    // TODO: Add validations
  }
}
