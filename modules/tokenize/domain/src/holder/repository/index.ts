import { ReadRepository, SelectionSet, WriteRepository } from '@appvise/domain';
import { TokenHolder } from '..';

export abstract class TokenHolderReadRepository extends ReadRepository<TokenHolder> {}
export abstract class TokenHolderWriteRepository extends WriteRepository<TokenHolder> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet
  ): Promise<TokenHolder | undefined>;
}
