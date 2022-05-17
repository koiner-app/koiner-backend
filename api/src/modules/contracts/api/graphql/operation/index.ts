import { ContractOperationsLoader } from './dataloader';
import {
  ContractOperationDetailsResolver,
  ContractOperationResolver,
  ContractOperationsResolver,
} from './query';
import { ContractOperationTypeResolver } from './detail-resolver';

export const ContractOperationGraphQLServices = [
  // DataLoaders
  ContractOperationsLoader,

  // Queries
  ContractOperationResolver,
  ContractOperationsResolver,
  ContractOperationDetailsResolver,

  // OperationType Resolvers
  ContractOperationTypeResolver,
];

export * from './dataloader';
export * from './detail-resolver';
export * from './dto';
