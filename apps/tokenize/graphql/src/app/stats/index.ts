import { KoinStatsResolver, TokenStatsResolver } from './query';

export const StatsGraphQLServices = [
  // Queries
  KoinStatsResolver,
  TokenStatsResolver,
];

export * from './dto';
