import { ContractsLoader } from './dataloader';
import { ContractResolver, ContractsResolver } from './query';

export const ContractGraphQLServices = [
  // DataLoaders
  ContractsLoader,

  // Queries
  ContractResolver,
  ContractsResolver,
];

export * from './dataloader';
export * from './dto';
