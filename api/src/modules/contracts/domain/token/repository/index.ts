import { ReadRepository, SelectionSet, WriteRepository } from '@appvise/domain';
import {
  BlockReward,
  BlockRewardBalance,
  TokenBalance,
  TokenContract,
  TokenOperation,
} from '..';

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
export abstract class TokenBalanceReadRepository extends ReadRepository<TokenBalance> {}
export abstract class TokenBalanceWriteRepository extends WriteRepository<TokenBalance> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet,
  ): Promise<TokenBalance | undefined>;
}
export abstract class TokenContractReadRepository extends ReadRepository<TokenContract> {}
export abstract class TokenContractWriteRepository extends WriteRepository<TokenContract> {}
export abstract class TokenOperationReadRepository extends ReadRepository<TokenOperation> {}
export abstract class TokenOperationWriteRepository extends WriteRepository<TokenOperation> {}
