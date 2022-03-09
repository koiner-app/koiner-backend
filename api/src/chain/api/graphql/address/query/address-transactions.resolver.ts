import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SelectionSet } from '@appvise/graphql';
import { TransactionsRequest } from '@koiner/chain/api/graphql/transaction/dto/transactions.request';
import { TransactionsConnection } from '@koiner/chain/api/graphql/transaction/dto/transactions.connection';
import { AddressNode } from '@koiner/chain/api/graphql/address/dto/address.node';
import { TransactionsResolver } from '@koiner/chain/api/graphql/transaction/query/transactions.resolver';

@Resolver((of) => AddressNode)
export class AddressTransactionsResolver {
  constructor(private transactionsResolver: TransactionsResolver) {}

  @ResolveField((returns) => TransactionsConnection)
  async transactions(
    @Parent() parent: AddressNode,
    @Args() request: TransactionsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TransactionsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.payer = { equals: parent.id };

    return this.transactionsResolver.execute(request, selectionSet);
  }
}
