import { Provider } from '@nestjs/common';
import { BlockRewardModels, BlockRewardRepositories } from './block-reward';
import { ContractModels, ContractRepositories } from './contract';

export * from './block-reward';
export * from './contract';

export const ContractsModels = [...BlockRewardModels, ...ContractModels];
export const ContractsModuleRepositories: Provider[] = [
  ...BlockRewardRepositories,
  ...ContractRepositories,
];
