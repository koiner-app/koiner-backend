import ContractResolvers from './contract';
import OperationResolvers from './operation';
import TokenContractResolvers from './token';

export default [
  ...ContractResolvers,
  ...OperationResolvers,
  ...TokenContractResolvers,
];
