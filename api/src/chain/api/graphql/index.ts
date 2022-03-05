import AddressResolvers from './address';
import BlockResolvers from './block';
import TransactionResolvers from './transaction';

export default [
  ...AddressResolvers,
  ...BlockResolvers,
  ...TransactionResolvers,
];
