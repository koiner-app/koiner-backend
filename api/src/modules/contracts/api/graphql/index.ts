import { ContractGraphQLServices } from './contract';
import { ContractOperationGraphQLServices } from './operation';
import { TokenGraphQLServices } from './token';

export * from './contract';
export * from './operation';
export * from './token';

export const ContractsModuleGraphQLServices = [
  ...ContractGraphQLServices,
  ...ContractOperationGraphQLServices,
  ...TokenGraphQLServices,
];
