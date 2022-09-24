import { BlockRewardGraphQLServices } from './block-reward';
import { ContractGraphQLServices } from './contract';
import { ContractOperationGraphQLServices } from './operation';

export * from './block-reward';
export * from './contract';
export * from './operation';

export const ContractsModuleGraphQLServices = [
  ...BlockRewardGraphQLServices,
  ...ContractGraphQLServices,
  ...ContractOperationGraphQLServices,
];
