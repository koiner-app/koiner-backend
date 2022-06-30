import {
  SystemCallOperationsLoader,
  SystemContractOperationsLoader,
  UploadContractOperationsLoader,
} from './dataloader';
import {
  OperationResolver,
  OperationsResolver,
  OperationDetailsResolver,
} from './query';
import {
  ContractOperationTypeResolver,
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
  OperationDetailsResolver,

  // OperationType Resolvers
  ContractOperationTypeResolver,
  SystemCallOperationTypeResolver,
  SystemContractOperationTypeResolver,
  UploadContractOperationTypeResolver,

  // OperationType Resolvers
  {
    provide: 'OperationTypeResolvers',
    useFactory: (r1, r2, r3, r4) => [r1, r2, r3, r4],
    inject: [
      ContractOperationTypeResolver,
      SystemCallOperationTypeResolver,
      SystemContractOperationTypeResolver,
      UploadContractOperationTypeResolver,
    ],
  },
];

export * from './dataloader';
export * from './detail-resolver';
export * from './dto';
