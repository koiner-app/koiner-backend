import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Contract } from '..';

export abstract class ContractReadRepository extends ReadRepository<Contract> {}
export abstract class ContractWriteRepository extends WriteRepository<Contract> {}
