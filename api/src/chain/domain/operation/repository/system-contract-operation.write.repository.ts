import { WriteRepository } from '@appvise/domain';
import { SystemContractOperation } from '../system-contract-operation';

export abstract class SystemContractOperationWriteRepository extends WriteRepository<SystemContractOperation> {}
