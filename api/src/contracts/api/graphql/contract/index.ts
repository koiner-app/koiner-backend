import { ContractOperationDetailsResolver } from './query/contract-operation-details.resolver';

export default [
  // Queries
  ContractOperationDetailsResolver,
];

// Must be exported for the enum to be registered in GraphQL schema
export * from './dto/contract-standard-type.enum';
