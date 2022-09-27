import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  Synchronization,
  SynchronizationReadRepository,
  SynchronizationWriteRepository,
} from '@koiner/sync/domain';
import { SynchronizationSchema, SynchronizationSchemaFactory } from '.';

// Factories
const synchronizationSchemaFactory = new SynchronizationSchemaFactory(
  Synchronization,
  SynchronizationSchema
);

export const SynchronizationRepositories: Provider[] = [
  // Synchronization
  TypeormRepositoryProvider.provide(
    SynchronizationReadRepository,
    SynchronizationSchema,
    synchronizationSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    SynchronizationWriteRepository,
    SynchronizationSchema,
    synchronizationSchemaFactory,
    false
  ),
];
