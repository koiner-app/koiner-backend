import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Chain } from '..';

export abstract class ChainReadRepository extends ReadRepository<Chain> {}
export abstract class ChainWriteRepository extends WriteRepository<Chain> {}
