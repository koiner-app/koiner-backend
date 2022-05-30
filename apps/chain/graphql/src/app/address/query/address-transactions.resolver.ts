import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TransactionsRequest } from '../../transaction/dto/transactions.request';
import { TransactionsConnection } from '../../transaction/dto/transactions.connection';
import { AddressNode } from '../../address/dto/address.node';
import { TransactionsResolver } from '../../transaction/query/transactions.resolver';

@Resolver(() => AddressNode)
export class AddressTransactionsResolver {
  constructor(private transactionsResolver: TransactionsResolver) {}

  @ResolveField('transactions', () => TransactionsConnection)
  async transactions(
    @Parent() parent: AddressNode,
    @Args() request: TransactionsRequest,
    @SelectionSet() selectionSet
  ): Promise<TransactionsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.payer = { equals: parent.id };

    return this.transactionsResolver.execute(request, selectionSet);
  }
}
