import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { BlockNode } from '@koiner/chain/api/graphql/block/dto/block.node';
import { TransactionsRequest } from '@koiner/chain/api/graphql/transaction/dto/transactions.request';
import { TransactionsConnection } from '@koiner/chain/api/graphql/transaction/dto/transactions.connection';
import { TransactionsResolver } from '@koiner/chain/api/graphql/transaction/query/transactions.resolver';

@Resolver(() => BlockNode)
export class BlockTransactionsResolver {
  constructor(private transactionsResolver: TransactionsResolver) {}

  @ResolveField(() => TransactionsConnection)
  async transactions(
    @Parent() block: BlockNode,
    @Args() request: TransactionsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TransactionsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.blockHeight = { equals: block.header.height };

    return this.transactionsResolver.execute(request, selectionSet);
  }
}
