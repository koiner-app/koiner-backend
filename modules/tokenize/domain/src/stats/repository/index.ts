import { ReadRepository, WriteRepository } from '@appvise/domain';
import { KoinStats, TokenStats } from '..';

export abstract class KoinStatsReadRepository extends ReadRepository<KoinStats> {}
export abstract class KoinStatsWriteRepository extends WriteRepository<KoinStats> {}
export abstract class TokenStatsReadRepository extends ReadRepository<TokenStats> {}
export abstract class TokenStatsWriteRepository extends WriteRepository<TokenStats> {}
