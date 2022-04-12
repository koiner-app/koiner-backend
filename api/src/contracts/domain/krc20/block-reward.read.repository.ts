import { ReadRepository } from '@appvise/domain';
import { BlockReward } from '@koiner/contracts/domain';

export abstract class BlockRewardReadRepository extends ReadRepository<BlockReward> {}
