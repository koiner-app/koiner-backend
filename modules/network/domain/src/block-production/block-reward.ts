import { AggregateRoot, UUID } from '@appvise/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import {
  BlockRewardCreated,
  BlockRewardProps,
  CreateBlockRewardProps,
} from '.';
import { koinosConfig } from '@koinos/jsonrpc';
import * as math from 'mathjs';

export class BlockReward extends AggregateRoot<BlockRewardProps> {
  protected readonly _id!: KoinosId;

  static create(create: CreateBlockRewardProps, id: UUID): BlockReward {
    const props: BlockRewardProps = {
      ...create,
      value: create.mintedValue - create.burnedValue,
      roi: math
        .chain<number>(create.mintedValue)
        .divide(create.burnedValue)
        .multiply(100)
        .subtract(100)
        .round(5)
        .done() as number,
    };

    const blockReward = new BlockReward({ id, props });

    blockReward.addEvent(
      new BlockRewardCreated({
        aggregateId: id.value,
        blockId: blockReward.blockId.value,
        blockHeight: blockReward.blockHeight,
        producerId: blockReward.producerId.value,
        value: blockReward.value,
        mintedValue: blockReward.mintedValue,
        contractId: blockReward.contractId.value,
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

  get mintedValue(): number {
    return this.props.mintedValue;
  }

  get burnedContractId(): KoinosAddressId {
    return new KoinosAddressId(koinosConfig.contracts.vhp);
  }

  get burnedValue(): number {
    return this.props.burnedValue;
  }

  get roi(): number {
    return this.props.roi;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  validate(): void {
    // TODO: Add validations
  }
}
