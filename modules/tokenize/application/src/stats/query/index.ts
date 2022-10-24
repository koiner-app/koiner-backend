import { ItemQuery } from '@appvise/domain';

export class TokenStatsQuery extends ItemQuery {}

import { TokenStatsHandler } from './token-stats.handler';

export const TokenStatsQueryHandlers = [TokenStatsHandler];
