import { Krc20ContractResolver } from './query/node-queries';
import { Krc20ContractsResolver } from './query/krc20-contracts.resolver';

export default [
  // Mutations
  //

  // Queries
  Krc20ContractResolver,
  Krc20ContractsResolver,
];
