import { Provider } from '@nestjs/common';
import { AddressModels, AddressRepositories } from './address';
import { BlockRewardModels, BlockRewardRepositories } from './block-reward';
import { ContractModels, ContractRepositories } from './contract';
import { TokenModels, TokenRepositories } from './token';

export * from './address';
export * from './contract';
export * from './token';

export const ContractsModels = [
  ...AddressModels,
  ...BlockRewardModels,
  ...ContractModels,
  ...TokenModels,
];
export const ContractsModuleRepositories: Provider[] = [
  ...AddressRepositories,
  ...BlockRewardRepositories,
  ...ContractRepositories,
  ...TokenRepositories,
];
