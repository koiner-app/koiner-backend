import { ReadRepository, WriteRepository } from '@appvise/domain';
import { TokenOperation } from '..';

export abstract class TokenOperationReadRepository extends ReadRepository<TokenOperation> {}
export abstract class TokenOperationWriteRepository extends WriteRepository<TokenOperation> {}
