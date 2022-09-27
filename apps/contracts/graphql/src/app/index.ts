import { ContractGraphQLServices } from './contract';
import { ContractOperationGraphQLServices } from './operation';

export * from './contract';
export * from './operation';

export const ContractsModuleGraphQLServices = [
  ...ContractGraphQLServices,
  ...ContractOperationGraphQLServices,
];
