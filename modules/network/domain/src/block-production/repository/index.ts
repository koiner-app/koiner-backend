import { ReadRepository, SelectionSet, WriteRepository } from '@appvise/domain';
import { BlockReward, BlockProducer } from '..';

export abstract class BlockRewardReadRepository extends ReadRepository<BlockReward> {
  abstract findOneByHeight(
    height: number,
    selectionSet?: SelectionSet
  ): Promise<BlockReward | undefined>;

  abstract findOneByHeightOrThrow(
    height: number,
    selectionSet?: SelectionSet
  ): Promise<BlockReward>;
}
export abstract class BlockRewardWriteRepository extends WriteRepository<BlockReward> {}
export abstract class BlockProducerReadRepository extends ReadRepository<BlockProducer> {}
export abstract class BlockProducerWriteRepository extends WriteRepository<BlockProducer> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet
  ): Promise<BlockProducer | undefined>;
}
