import { ReadRepository, WriteRepository } from '@appvise/domain';
import { StopSignal, Synchronization } from '..';

export abstract class StopSignalReadRepository extends ReadRepository<StopSignal> {}
export abstract class StopSignalWriteRepository extends WriteRepository<StopSignal> {}
export abstract class SynchronizationReadRepository extends ReadRepository<Synchronization> {}
export abstract class SynchronizationWriteRepository extends WriteRepository<Synchronization> {}
