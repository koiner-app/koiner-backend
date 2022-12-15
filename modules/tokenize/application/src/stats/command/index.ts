import { CreateOrUpdateKoinStatsHandler } from './create-or-update-koin-stats.handler';
import { CreateOrUpdateTokenStatsHandler } from './create-or-update-token-stats.handler';

export { CreateOrUpdateKoinStatsCommand } from './dto/create-or-update-koin-stats.command';
export { CreateOrUpdateTokenStatsCommand } from './dto/create-or-update-token-stats.command';

export const TokenStatsCommandHandlers = [
  CreateOrUpdateKoinStatsHandler,
  CreateOrUpdateTokenStatsHandler,
];
