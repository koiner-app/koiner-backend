import {
  SystemCallOperationsLoader,
  SystemContractOperationsLoader,
  UploadContractOperationsLoader,
} from './dataloader';
import { OperationResolver, OperationsResolver } from './query';
import {
  SystemCallOperationTypeResolver,
  SystemContractOperationTypeResolver,
  UploadContractOperationTypeResolver,
} from './detail-resolver';

export const OperationGraphQLServices = [
  // DataLoaders
  SystemCallOperationsLoader,
  SystemContractOperationsLoader,
  UploadContractOperationsLoader,

  // Queries
  OperationResolver,
  OperationsResolver,

  // OperationType Resolvers
  SystemCallOperationTypeResolver,
  SystemContractOperationTypeResolver,
  UploadContractOperationTypeResolver,
];

export * from './dataloader';
export * from './detail-resolver';
export * from './dto';
