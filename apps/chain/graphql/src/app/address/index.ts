import { AddressesLoader } from './dataloader';
import {
  AddressResolver,
  AddressesResolver,
  AddressesBulkResolver,
  AddressTransactionsResolver,
} from './query';

export const AddressGraphQLServices = [
  // DataLoaders
  AddressesLoader,

  // Queries
  AddressResolver,
  AddressesResolver,
  AddressesBulkResolver,
  AddressTransactionsResolver,
];

export * from './dataloader';
export * from './dto';
