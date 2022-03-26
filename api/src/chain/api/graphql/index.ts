import AddressResolvers from './address';
import BlockResolvers from './block';
import OperationResolvers from './operation';
import TransactionResolvers from './transaction';

export default [
  ...AddressResolvers,
  ...BlockResolvers,
  ...OperationResolvers,
  ...TransactionResolvers,
];
