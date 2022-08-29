import { ContractEventsLoader, ContractsLoader } from './dataloader';
import {
  ContractEventContractResolver,
  ContractEventResolver,
  ContractEventsResolver,
  ContractResolver,
  ContractsBulkResolver,
  ContractsResolver,
} from './query';

export const ContractGraphQLServices = [
  // DataLoaders
  ContractsLoader,
  ContractEventsLoader,

  // Queries
  ContractResolver,
  ContractsResolver,
  ContractsBulkResolver,
  ContractEventResolver,
  ContractEventsResolver,

  // FieldResolvers
  ContractEventContractResolver,
];

export * from './dataloader';
export * from './dto';
