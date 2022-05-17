import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Chain,
  ChainReadRepository,
  ChainWriteRepository,
} from '@koiner/chain/domain';
import { ChainSchema, ChainSchemaFactory } from '.';

// Factories
const chainSchemaFactory = new ChainSchemaFactory(Chain, ChainSchema);

export const ChainRepositories: Provider[] = [
  // Chain
  TypeormRepositoryProvider.provide(
    ChainReadRepository,
    ChainSchema,
    chainSchemaFactory,
  ),
  TypeormRepositoryProvider.provide(
    ChainWriteRepository,
    ChainSchema,
    chainSchemaFactory,
    false,
  ),
];
