import { WriteRepository } from '@appvise/domain';
import { Contract } from './contract';

export abstract class ContractWriteRepository extends WriteRepository<Contract> {}
