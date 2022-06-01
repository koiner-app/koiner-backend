import { ReadRepository, SelectionSet, WriteRepository } from '@appvise/domain';
import { BlockReward, BlockRewardBalance } from '..';

export abstract class BlockRewardReadRepository extends ReadRepository<BlockReward> {
  abstract findOneByHeight(
    height: number,
    selectionSet?: SelectionSet,
  ): Promise<BlockReward | undefined>;

  abstract findOneByHeightOrThrow(
    height: number,
    selectionSet?: SelectionSet,
  ): Promise<BlockReward>;
}
export abstract class BlockRewardWriteRepository extends WriteRepository<BlockReward> {}
export abstract class BlockRewardBalanceReadRepository extends ReadRepository<BlockRewardBalance> {}
export abstract class BlockRewardBalanceWriteRepository extends WriteRepository<BlockRewardBalance> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet,
  ): Promise<BlockRewardBalance | undefined>;
}
