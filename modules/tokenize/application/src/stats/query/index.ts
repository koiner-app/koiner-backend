import { ItemQuery } from '@appvise/domain';

export class KoinStatsQuery extends ItemQuery {}
export class TokenStatsQuery extends ItemQuery {}

import { KoinStatsHandler } from './koin-stats.handler';
import { TokenStatsHandler } from './token-stats.handler';

export const TokenStatsQueryHandlers = [KoinStatsHandler, TokenStatsHandler];
