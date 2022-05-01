import { ContractOperationResolver } from './queries';
import { ContractOperationsResolver } from './query/contract-operations.resolver';
import { ContractOperationDetailsResolver } from './query/contract-operation-details.resolver';
import { ContractOperationsLoader } from './dataloader/contract-operations.loader';
import { ContractOperationTypeResolver } from './detail-resolver/contract-operation-type.resolver';

export default [
  // Mutations
  //

  // Queries
  ContractOperationResolver,
  ContractOperationsResolver,
  ContractOperationDetailsResolver,

  // OperationType Resolvers
  ContractOperationTypeResolver,

  // DataLoaders
  ContractOperationsLoader,
];
