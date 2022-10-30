// Dto exports must be before resolvers
import {
  ResumeSynchronizationResolver,
  StopSynchronizationResolver,
  SyncNextBatchResolver,
} from './mutation';

export * from './dto';

import { SynchronizationResolver } from './query';

export const SynchronizationGraphQLServices = [
  // Mutations
  ResumeSynchronizationResolver,
  StopSynchronizationResolver,
  SyncNextBatchResolver,

  // Queries
  SynchronizationResolver,
];
