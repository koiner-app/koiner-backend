import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TokenHoldersResolver } from '../../holder/query/token-holders.resolver';
import { TokenHoldersConnection, TokenHoldersRequest } from '../../holder/dto';
import { TokenContractNode } from '../dto';

@Resolver(() => TokenContractNode)
export class TokenContractHoldersResolver {
  constructor(private tokenHoldersResolver: TokenHoldersResolver) {}

  @ResolveField('holders', () => TokenHoldersConnection)
  async holders(
    @Parent() contractNode: TokenContractNode,
    @Args() request: TokenHoldersRequest,
    @SelectionSet() selectionSet
  ): Promise<TokenHoldersConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.contractId = { equals: contractNode.id };

    return this.tokenHoldersResolver.execute(request, selectionSet);
  }
}
