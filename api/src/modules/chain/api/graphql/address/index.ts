import { AddressResolver } from './queries';
import { AddressesResolver } from './query/addresses.resolver';
import { AddressTransactionsResolver } from './query/address-transactions.resolver';
import { AddressCreatedSubscription } from './subscription/address-created.subscription';
import AddressPubSubEventHandlers from './pubsub';

export default [
  // Mutations
  //

  // Queries
  AddressResolver,
  AddressesResolver,
  AddressTransactionsResolver,

  // Subscriptions
  AddressCreatedSubscription,

  // PubSub
  ...AddressPubSubEventHandlers,
];
