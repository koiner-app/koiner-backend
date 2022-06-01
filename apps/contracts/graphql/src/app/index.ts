import { BlockRewardGraphQLServices } from './block-reward';
import { ContractGraphQLServices } from './contract';
import { ContractOperationGraphQLServices } from './operation';
import { TokenGraphQLServices } from './token';

export * from './block-reward';
export * from './contract';
export * from './operation';
export * from './token';

export const ContractsModuleGraphQLServices = [
  ...BlockRewardGraphQLServices,
  ...ContractGraphQLServices,
  ...ContractOperationGraphQLServices,
  ...TokenGraphQLServices,
];
