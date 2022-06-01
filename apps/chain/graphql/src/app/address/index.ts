import { AddressesLoader } from './dataloader';
import {
  AddressResolver,
  AddressesResolver,
  AddressTransactionsResolver,
} from './query';

export const AddressGraphQLServices = [
  // DataLoaders
  AddressesLoader,

  // Queries
  AddressResolver,
  AddressesResolver,
  AddressTransactionsResolver,
];

export * from './dataloader';
export * from './dto';
