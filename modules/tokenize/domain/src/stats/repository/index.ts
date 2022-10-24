import { ReadRepository, WriteRepository } from '@appvise/domain';
import { TokenStats } from '..';

export abstract class TokenStatsReadRepository extends ReadRepository<TokenStats> {}
export abstract class TokenStatsWriteRepository extends WriteRepository<TokenStats> {}
