import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  TokenStats,
  TokenStatsReadRepository,
  TokenStatsWriteRepository,
} from '@koiner/tokenize/domain';
import { TokenStatsSchema, TokenStatsSchemaFactory } from '.';

// Factories
const tokenStatsSchemaFactory = new TokenStatsSchemaFactory(
  TokenStats,
  TokenStatsSchema
);

export const StatsRepositories: Provider[] = [
  // TokenStats
  TypeormRepositoryProvider.provide(
    TokenStatsReadRepository,
    TokenStatsSchema,
    tokenStatsSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    TokenStatsWriteRepository,
    TokenStatsSchema,
    tokenStatsSchemaFactory,
    false
  ),
];
