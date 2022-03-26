import { OperationResolver } from './queries';
import { OperationsResolver } from './query/operations.resolver';
import { OperationDetailsResolver } from '@koiner/chain/api/graphql/operation/query/operation-details.resolver';

export default [
  // Mutations
  //

  // Queries
  OperationResolver,
  OperationsResolver,
  OperationDetailsResolver,
];

// Must be exported for the enum to be registered in GraphQL schema
export * from './dto/operation-type.enum';
