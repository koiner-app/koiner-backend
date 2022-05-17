import { Provider } from '@nestjs/common';
import { AddressModels, AddressRepositories } from './address';
import { BlockModels, BlockRepositories } from './block';
import { ChainModels, ChainRepositories } from './chain';
import { EventModels, EventRepositories } from './event';
import { OperationModels, OperationRepositories } from './operation';
import { TransactionModels, TransactionRepositories } from './transaction';

export * from './address';
export * from './block';
export * from './chain';
export * from './event';
export * from './operation';
export * from './transaction';

export const ChainModuleModels = [
  ...AddressModels,
  ...BlockModels,
  ...ChainModels,
  ...EventModels,
  ...OperationModels,
  ...TransactionModels,
];
export const ChainModuleRepositories: Provider[] = [
  ...AddressRepositories,
  ...BlockRepositories,
  ...ChainRepositories,
  ...EventRepositories,
  ...OperationRepositories,
  ...TransactionRepositories,
];
