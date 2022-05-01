import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TokenContractNode } from '@koiner/contracts/api/graphql/token/dto/token-contract.node';
import { TokenOperationsRequest } from '@koiner/contracts/api/graphql/token/dto/token-operations.request';
import { TokenOperationsConnection } from '@koiner/contracts/api/graphql/token/dto/token-operations.connection';
import { TokenOperationsResolver } from '@koiner/contracts/api/graphql/token/query/token-operations.resolver';

@Resolver(() => TokenContractNode)
export class TokenContractOperationsResolver {
  constructor(private tokenOperationsResolver: TokenOperationsResolver) {}

  @ResolveField('operations', () => TokenOperationsConnection)
  async operations(
    @Parent() contractNode: TokenContractNode,
    @Args() request: TokenOperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TokenOperationsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.contractId = { equals: contractNode.id };

    return this.tokenOperationsResolver.execute(request, selectionSet);
  }
}
