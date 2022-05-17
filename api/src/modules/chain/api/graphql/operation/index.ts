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
import { OperationCreatedSubscription } from './subscription';
import { OperationPubSubEventHandlers } from './pubsub';

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

  // Subscriptions
  OperationCreatedSubscription,

  // PubSub
  ...OperationPubSubEventHandlers,
];

export * from './dataloader';
export * from './detail-resolver';
export * from './dto';
