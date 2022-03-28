import {
  Krc20ContractResolver,
  Krc20OperationResolver,
} from './query/node-queries';
import { Krc20ContractsResolver } from './query/krc20-contracts.resolver';
import { Krc20ContractOperationsResolver } from './query/krc20-contract-operations.resolver';
import { Krc20OperationsResolver } from './query/krc20-operations.resolver';

export default [
  // Queries
  Krc20ContractResolver,
  Krc20ContractsResolver,
  Krc20OperationResolver,
  Krc20OperationsResolver,

  // FieldResolvers
  Krc20ContractOperationsResolver,
];
