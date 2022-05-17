import { AddressesLoader } from './dataloader';
import {
  AddressResolver,
  AddressesResolver,
  AddressTransactionsResolver,
} from './query';
import { AddressCreatedSubscription } from './subscription';
import { AddressPubSubEventHandlers } from './pubsub';

export const AddressGraphQLServices = [
  // DataLoaders
  AddressesLoader,

  // Queries
  AddressResolver,
  AddressesResolver,
  AddressTransactionsResolver,

  // Subscriptions
  AddressCreatedSubscription,

  // PubSub
  ...AddressPubSubEventHandlers,
];

export * from './dataloader';
export * from './dto';
