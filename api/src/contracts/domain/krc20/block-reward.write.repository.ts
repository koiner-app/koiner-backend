import { WriteRepository } from '@appvise/domain';
import { BlockReward } from '@koiner/contracts/domain';

export abstract class BlockRewardWriteRepository extends WriteRepository<BlockReward> {}
