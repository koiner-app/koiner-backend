import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TokenBalancesResolver } from '@koiner/contracts/api/graphql/token/query/token-balances.resolver';
import {
  TokenContractNode,
  TokenBalancesConnection,
  TokenBalancesRequest,
} from '../dto';

@Resolver(() => TokenContractNode)
export class TokenContractBalancesResolver {
  constructor(private tokenBalancesResolver: TokenBalancesResolver) {}

  @ResolveField('balances', () => TokenBalancesConnection)
  async balances(
    @Parent() contractNode: TokenContractNode,
    @Args() request: TokenBalancesRequest,
    @SelectionSet() selectionSet,
  ): Promise<TokenBalancesConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.contractId = { equals: contractNode.id };

    return this.tokenBalancesResolver.execute(request, selectionSet);
  }
}
