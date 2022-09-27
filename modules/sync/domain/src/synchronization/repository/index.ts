import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Synchronization } from '..';

export abstract class SynchronizationReadRepository extends ReadRepository<Synchronization> {}
export abstract class SynchronizationWriteRepository extends WriteRepository<Synchronization> {}
