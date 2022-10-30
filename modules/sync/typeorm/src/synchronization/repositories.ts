import { TypeormRepositoryProvider } from '@appvise/typeorm';
import { Provider } from '@nestjs/common';
import {
  StopSignal,
  StopSignalReadRepository,
  StopSignalWriteRepository,
  Synchronization,
  SynchronizationReadRepository,
  SynchronizationWriteRepository,
} from '@koiner/sync/domain';
import {
  StopSignalSchema,
  StopSignalSchemaFactory,
  SynchronizationSchema,
  SynchronizationSchemaFactory,
} from '.';

// Factories
const stopSignalSchemaFactory = new StopSignalSchemaFactory(
  StopSignal,
  StopSignalSchema
);

const synchronizationSchemaFactory = new SynchronizationSchemaFactory(
  Synchronization,
  SynchronizationSchema
);

export const SynchronizationRepositories: Provider[] = [
  // StopSignal
  TypeormRepositoryProvider.provide(
    StopSignalReadRepository,
    StopSignalSchema,
    stopSignalSchemaFactory
  ),
  TypeormRepositoryProvider.provide(
    StopSignalWriteRepository,
    StopSignalSchema,
    stopSignalSchemaFactory,
    false
  ),

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
