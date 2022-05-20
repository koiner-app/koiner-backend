import { AddressGraphQLServices } from './address';
import { BlockGraphQLServices } from './block';
import { EventGraphQLServices } from './event';
import { OperationGraphQLServices } from './operation';
import { TransactionGraphQLServices } from './transaction';

export * from './address';
export * from './block';
export * from './event';
export * from './operation';
export * from './transaction';

export const ChainModuleGraphQLServices = [
  ...AddressGraphQLServices,
  ...BlockGraphQLServices,
  ...EventGraphQLServices,
  ...OperationGraphQLServices,
  ...TransactionGraphQLServices,
];
