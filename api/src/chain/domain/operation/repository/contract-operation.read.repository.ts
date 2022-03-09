import { ReadRepository } from '@appvise/domain';
import { ContractOperation } from '../contract-operation';

export abstract class ContractOperationReadRepository extends ReadRepository<ContractOperation> {}
