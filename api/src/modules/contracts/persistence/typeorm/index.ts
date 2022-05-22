import { Provider } from '@nestjs/common';
import { BlockRewardModels, BlockRewardRepositories } from './block-reward';
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
  ...BlockRewardModels,
  ...ContractModels,
  ...ContractOperationModels,
  ...TokenModels,
];
export const ContractsRepositories: Provider[] = [
  ...BlockRewardRepositories,
  ...ContractRepositories,
  ...ContractOperationRepositories,
  ...TokenRepositories,
];
