import { Provider } from '@nestjs/common';
import { AddressModels, AddressRepositories } from './address';
import { BlockModels, BlockRepositories } from './block';
import { EventModels, EventRepositories } from './event';
import { OperationModels, OperationRepositories } from './operation';
import { TransactionModels, TransactionRepositories } from './transaction';

export * from './address';
export * from './block';
export * from './event';
export * from './operation';
export * from './transaction';

export const ChainModuleModels = [
  ...AddressModels,
  ...BlockModels,
  ...EventModels,
  ...OperationModels,
  ...TransactionModels,
];
export const ChainModuleRepositories: Provider[] = [
  ...AddressRepositories,
  ...BlockRepositories,
  ...EventRepositories,
  ...OperationRepositories,
  ...TransactionRepositories,
];
