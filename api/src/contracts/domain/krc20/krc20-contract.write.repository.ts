import { WriteRepository } from '@appvise/domain';
import { Krc20Contract } from './krc20-contract';

export abstract class Krc20ContractWriteRepository extends WriteRepository<Krc20Contract> {}
