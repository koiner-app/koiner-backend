import { Provider } from '@nestjs/common';
import { ContractModels, ContractRepositories } from './contract';
import {
  ContractOperationModels,
  ContractOperationRepositories,
} from './operation';
import { TokenModels, TokenRepositories } from './token';

export * from './contract';
export * from './operation';
export * from './token';

export const ContractsModels = [
  ...ContractModels,
  ...ContractOperationModels,
  ...TokenModels,
];
export const ContractsRepositories: Provider[] = [
  ...ContractRepositories,
  ...ContractOperationRepositories,
  ...TokenRepositories,
];
