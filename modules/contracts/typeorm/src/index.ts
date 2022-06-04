import { Provider } from '@nestjs/common';
import { AddressModels, AddressRepositories } from './address';
import { BlockRewardModels, BlockRewardRepositories } from './block-reward';
import { ContractModels, ContractRepositories } from './contract';
import {
  ContractOperationModels,
  ContractOperationRepositories,
} from './operation';
import { TokenModels, TokenRepositories } from './token';

export * from './address';
export * from './contract';
export * from './operation';
export * from './token';

export const ContractsModels = [
  ...AddressModels,
  ...BlockRewardModels,
  ...ContractModels,
  ...ContractOperationModels,
  ...TokenModels,
];
export const ContractsRepositories: Provider[] = [
  ...AddressRepositories,
  ...BlockRewardRepositories,
  ...ContractRepositories,
  ...ContractOperationRepositories,
  ...TokenRepositories,
];
