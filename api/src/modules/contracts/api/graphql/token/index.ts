import {
  TokenContractResolver,
  TokenOperationResolver,
} from './query/node-queries';
import { TokenContractsResolver } from './query/token-contracts.resolver';
import { TokenContractOperationsResolver } from './query/token-contract-operations.resolver';
import { TokenOperationsResolver } from './query/token-operations.resolver';

export default [
  // Queries
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenContractOperationsResolver,
];
