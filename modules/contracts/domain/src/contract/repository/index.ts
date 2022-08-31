import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Contract, ContractEvent, ContractOperation } from '..';

export abstract class ContractReadRepository extends ReadRepository<Contract> {}
export abstract class ContractWriteRepository extends WriteRepository<Contract> {}
export abstract class ContractEventReadRepository extends ReadRepository<ContractEvent> {}
export abstract class ContractEventWriteRepository extends WriteRepository<ContractEvent> {}
export abstract class ContractOperationReadRepository extends ReadRepository<ContractOperation> {}
export abstract class ContractOperationWriteRepository extends WriteRepository<ContractOperation> {}
