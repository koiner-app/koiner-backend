import { ContractResolver } from './query/node-queries';
import { ContractsResolver } from './query/contracts.resolver';
import { ContractsLoader } from './dataloader/contract.loader';

export default [
  // Queries
  ContractResolver,
  ContractsResolver,

  // DataLoaders
  ContractsLoader,
];

// Must be exported for the enum to be registered in GraphQL schema
export * from './dto/contract-standard-type.enum';
