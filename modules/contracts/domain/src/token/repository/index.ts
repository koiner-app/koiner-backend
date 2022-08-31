import { ReadRepository, SelectionSet, WriteRepository } from '@appvise/domain';
import { TokenHolder, TokenContract, TokenEvent, TokenOperation } from '..';

export abstract class TokenContractReadRepository extends ReadRepository<TokenContract> {}
export abstract class TokenContractWriteRepository extends WriteRepository<TokenContract> {}
export abstract class TokenEventReadRepository extends ReadRepository<TokenEvent> {}
export abstract class TokenEventWriteRepository extends WriteRepository<TokenEvent> {}
export abstract class TokenHolderReadRepository extends ReadRepository<TokenHolder> {}
export abstract class TokenHolderWriteRepository extends WriteRepository<TokenHolder> {
  abstract findOne(
    addressId: string,
    contractId: string,
    selectionSet?: SelectionSet
  ): Promise<TokenHolder | undefined>;
}
export abstract class TokenOperationReadRepository extends ReadRepository<TokenOperation> {}
export abstract class TokenOperationWriteRepository extends WriteRepository<TokenOperation> {}
