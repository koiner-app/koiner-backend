import { ReadRepository } from '@appvise/domain';
import { Krc20Balance } from '@koiner/contracts/domain';

export abstract class Krc20BalanceReadRepository extends ReadRepository<Krc20Balance> {}
