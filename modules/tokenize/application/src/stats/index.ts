import { TokenStatsCommandHandlers } from './command';
import { TokenStatsQueryHandlers } from './query';

export * from './command';
export * from './query';

export const StatsApplicationHandlers = [
  ...TokenStatsCommandHandlers,
  ...TokenStatsQueryHandlers,
];
