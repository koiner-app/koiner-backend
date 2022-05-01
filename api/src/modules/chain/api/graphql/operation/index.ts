import { OperationResolver } from './queries';
import { OperationsResolver } from './query/operations.resolver';
import { SystemCallOperationsLoader } from './dataloader/system-call-operations.loader';
import { SystemContractOperationsLoader } from './dataloader/system-contract-operations.loader';
import { UploadContractOperationsLoader } from './dataloader/upload-contract-operations.loader';
import { SystemCallOperationTypeResolver } from './detail-resolver/system-call-operation-type.resolver';
import { SystemContractOperationTypeResolver } from './detail-resolver/system-contract-operation-type.resolver';
import { UploadContractOperationTypeResolver } from './detail-resolver/upload-contract-operation-type.resolver';

export default [
  // Mutations
  //

  // Queries
  OperationResolver,
  OperationsResolver,

  // OperationType Resolvers
  SystemCallOperationTypeResolver,
  SystemContractOperationTypeResolver,
  UploadContractOperationTypeResolver,

  // DataLoaders
  SystemCallOperationsLoader,
  SystemContractOperationsLoader,
  UploadContractOperationsLoader,
];

// Must be exported for the enum to be registered in GraphQL schema
export * from './dto/operation-type.enum';
