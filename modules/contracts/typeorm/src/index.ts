import { Provider } from '@nestjs/common';
import { AddressModels, AddressRepositories } from './address';
import { BlockRewardModels, BlockRewardRepositories } from './block-reward';
import { ContractModels, ContractRepositories } from './contract';

export * from './address';
export * from './block-reward';
export * from './contract';

export const ContractsModels = [
  ...AddressModels,
  ...BlockRewardModels,
  ...ContractModels,
];
export const ContractsModuleRepositories: Provider[] = [
  ...AddressRepositories,
  ...BlockRewardRepositories,
  ...ContractRepositories,
];
