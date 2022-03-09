import { ReadRepository } from '@appvise/domain';
import { Krc20Operation } from '@koiner/contracts/domain';

export abstract class Krc20OperationReadRepository extends ReadRepository<Krc20Operation> {}
