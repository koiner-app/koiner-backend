import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Contract, ContractEvent } from '..';

export abstract class ContractReadRepository extends ReadRepository<Contract> {}
export abstract class ContractWriteRepository extends WriteRepository<Contract> {}
export abstract class ContractEventReadRepository extends ReadRepository<ContractEvent> {}
export abstract class ContractEventWriteRepository extends WriteRepository<ContractEvent> {}
