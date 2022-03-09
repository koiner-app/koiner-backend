import { WriteRepository } from '@appvise/domain';
import { Krc20Operation } from '@koiner/contracts/domain';

export abstract class Krc20OperationWriteRepository extends WriteRepository<Krc20Operation> {}
