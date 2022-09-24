export * from './dto';

import {
  ContractOperationResolver,
  ContractOperationsBulkResolver,
  ContractOperationsResolver,
} from './query';

export const ContractOperationGraphQLServices = [
  // Queries
  ContractOperationResolver,
  ContractOperationsResolver,
  ContractOperationsBulkResolver,
];
