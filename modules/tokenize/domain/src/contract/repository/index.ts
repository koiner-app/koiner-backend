import { ReadRepository, WriteRepository } from '@appvise/domain';
import { TokenContract } from '..';

export abstract class TokenContractReadRepository extends ReadRepository<TokenContract> {}
export abstract class TokenContractWriteRepository extends WriteRepository<TokenContract> {}
