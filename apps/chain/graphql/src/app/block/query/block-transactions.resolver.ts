import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { BlockNode } from '../dto/block.node';
import { TransactionsRequest } from '../../transaction';
import { TransactionsConnection } from '../../transaction';
import { TransactionsResolver } from '../../transaction/query/transactions.resolver';

@Resolver(() => BlockNode)
export class BlockTransactionsResolver {
  constructor(private transactionsResolver: TransactionsResolver) {}

  @ResolveField('transactions', () => TransactionsConnection)
  async transactions(
    @Parent() block: BlockNode,
    @Args() request: TransactionsRequest,
    @SelectionSet() selectionSet
  ): Promise<TransactionsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.blockHeight = { equals: block.header.height };

    return this.transactionsResolver.execute(request, selectionSet);
  }
}
