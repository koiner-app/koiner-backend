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

export const ContractsModuleModels = [
  ...ContractModels,
  ...ContractOperationModels,
  ...TokenModels,
];
export const ContractsModuleRepositories: Provider[] = [
  ...ContractRepositories,
  ...ContractOperationRepositories,
  ...TokenRepositories,
];
