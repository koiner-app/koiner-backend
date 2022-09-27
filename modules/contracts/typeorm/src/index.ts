import { Provider } from '@nestjs/common';
import { ContractModels, ContractRepositories } from './contract';

export * from './contract';

export const ContractsModels = [...ContractModels];
export const ContractsModuleRepositories: Provider[] = [
  ...ContractRepositories,
];
