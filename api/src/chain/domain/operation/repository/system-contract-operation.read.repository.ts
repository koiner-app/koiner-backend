import { ReadRepository } from '@appvise/domain';
import { SystemContractOperation } from '../system-contract-operation';

export abstract class SystemContractOperationReadRepository extends ReadRepository<SystemContractOperation> {}
