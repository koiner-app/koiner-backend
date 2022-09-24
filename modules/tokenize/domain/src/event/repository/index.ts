import { ReadRepository, WriteRepository } from '@appvise/domain';
import { TokenEvent } from '..';

export abstract class TokenEventReadRepository extends ReadRepository<TokenEvent> {}
export abstract class TokenEventWriteRepository extends WriteRepository<TokenEvent> {}
