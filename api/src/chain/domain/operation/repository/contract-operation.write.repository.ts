import { WriteRepository } from '@appvise/domain';
import { ContractOperation } from '../contract-operation';

export abstract class ContractOperationWriteRepository extends WriteRepository<ContractOperation> {}
