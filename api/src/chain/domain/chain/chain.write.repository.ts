import { WriteRepository } from '@appvise/domain';
import { Chain } from './chain';

export abstract class ChainWriteRepository extends WriteRepository<Chain> {}
