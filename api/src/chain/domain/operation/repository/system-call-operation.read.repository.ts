import { ReadRepository } from '@appvise/domain';
import { SystemCallOperation } from '../system-call-operation';

export abstract class SystemCallOperationReadRepository extends ReadRepository<SystemCallOperation> {}
