import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { Krc20ContractNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-contract.node';
import { Krc20OperationsRequest } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operations.request';
import { Krc20OperationsConnection } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operations.connection';
import { Krc20OperationsResolver } from '@koiner/contracts/api/graphql/krc20/query/krc20-operations.resolver';

@Resolver(() => Krc20ContractNode)
export class Krc20ContractOperationsResolver {
  constructor(private krc20OperationsResolver: Krc20OperationsResolver) {}

  @ResolveField(() => Krc20OperationsConnection, { name: 'operations' })
  async operations(
    @Parent() contractNode: Krc20ContractNode,
    @Args() request: Krc20OperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<Krc20OperationsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.contractId = { equals: contractNode.id };

    return this.krc20OperationsResolver.execute(request, selectionSet);
  }
}
