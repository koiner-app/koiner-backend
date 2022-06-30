import { ContractsLoader } from './dataloader';
import {
  ContractResolver,
  ContractsBulkResolver,
  ContractsResolver,
} from './query';

export const ContractGraphQLServices = [
  // DataLoaders
  ContractsLoader,

  // Queries
  ContractResolver,
  ContractsResolver,
  ContractsBulkResolver,
];

export * from './dataloader';
export * from './dto';
