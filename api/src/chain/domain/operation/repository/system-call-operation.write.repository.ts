import { WriteRepository } from '@appvise/domain';
import { SystemCallOperation } from '../system-call-operation';

export abstract class SystemCallOperationWriteRepository extends WriteRepository<SystemCallOperation> {}
