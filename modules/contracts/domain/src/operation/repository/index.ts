import { ReadRepository, WriteRepository } from '@appvise/domain';
import { ContractOperation } from '..';

export abstract class ContractOperationReadRepository extends ReadRepository<ContractOperation> {}
export abstract class ContractOperationWriteRepository extends WriteRepository<ContractOperation> {}
