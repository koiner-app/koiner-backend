// TODO: Fix
// import { ContractOperationsLoader } from './dataloader';
import {
  ContractOperationDetailsResolver,
  ContractOperationResolver,
  ContractOperationsBulkResolver,
  ContractOperationsResolver,
} from './query';
// TODO: Fix
// import { ContractOperationTypeResolver } from './detail-resolver';

export const ContractOperationGraphQLServices = [
  // DataLoaders
  // TODO: Fix
  // ContractOperationsLoader,

  // Queries
  ContractOperationResolver,
  ContractOperationsResolver,
  ContractOperationDetailsResolver,
  ContractOperationsBulkResolver,

  // OperationType Resolvers
  // TODO: Fix
  // ContractOperationTypeResolver,
];

// TODO: Fix
// export * from './dataloader';
// TODO: Fix
// export * from './detail-resolver';
export * from './dto';
