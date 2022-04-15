import { ReadRepository, SelectionSet, WriteRepository } from '@appvise/domain';
import {
  BlockReward,
  BlockRewardBalance,
  Krc20Balance,
  Krc20Contract,
  Krc20Operation,
} from '@koiner/contracts/domain';

export abstract class BlockRewardReadRepository extends ReadRepository<BlockReward> {}
export abstract class BlockRewardWriteRepository extends WriteRepository<BlockReward> {}
export abstract class BlockRewardBalanceReadRepository extends ReadRepository<BlockRewardBalance> {}
export abstract class BlockRewardBalanceWriteRepository extends WriteRepository<BlockRewardBalance> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet,
  ): Promise<BlockRewardBalance | undefined>;
}
export abstract class Krc20BalanceReadRepository extends ReadRepository<Krc20Balance> {}
export abstract class Krc20BalanceWriteRepository extends WriteRepository<Krc20Balance> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet,
  ): Promise<Krc20Balance | undefined>;
}
export abstract class Krc20ContractReadRepository extends ReadRepository<Krc20Contract> {}
export abstract class Krc20ContractWriteRepository extends WriteRepository<Krc20Contract> {}
export abstract class Krc20OperationReadRepository extends ReadRepository<Krc20Operation> {}
export abstract class Krc20OperationWriteRepository extends WriteRepository<Krc20Operation> {}
