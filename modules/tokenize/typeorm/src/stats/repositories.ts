import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  KoinStats,
  KoinStatsReadRepository,
  KoinStatsWriteRepository,
  TokenStats,
  TokenStatsReadRepository,
  TokenStatsWriteRepository,
} from '@koiner/tokenize/domain';
import {
  KoinStatsSchema,
  KoinStatsSchemaFactory,
  TokenStatsSchema,
  TokenStatsSchemaFactory,
} from '.';

// Factories
const koinStatsSchemaFactory = new KoinStatsSchemaFactory(
  KoinStats,
  KoinStatsSchema
);

const tokenStatsSchemaFactory = new TokenStatsSchemaFactory(
  TokenStats,
  TokenStatsSchema
);

export const StatsRepositories: Provider[] = [
  // KoinStats
  TypeormRepositoryProvider.provide(
    KoinStatsReadRepository,
    KoinStatsSchema,
    koinStatsSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    KoinStatsWriteRepository,
    KoinStatsSchema,
    koinStatsSchemaFactory,
    false
  ),

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
