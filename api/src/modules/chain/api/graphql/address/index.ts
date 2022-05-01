import { AddressResolver } from './queries';
import { AddressesResolver } from './query/addresses.resolver';
import { AddressTransactionsResolver } from './query/address-transactions.resolver';

export default [
  // Mutations
  //

  // Queries
  AddressResolver,
  AddressesResolver,
  AddressTransactionsResolver,
];
