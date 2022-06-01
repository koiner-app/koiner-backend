import { AddressApplicationHandlers } from './address';
import { BlockApplicationHandlers } from './block';
import { ChainApplicationHandlers } from './chain';
import { EventApplicationHandlers } from './event';
import { OperationApplicationHandlers } from './operation';
import { TransactionApplicationHandlers } from './transaction';

export * from './address';
export * from './block';
export * from './chain';
export * from './event';
export * from './operation';
export * from './transaction';

export const ChainModuleApplicationHandlers = [
  ...AddressApplicationHandlers,
  ...BlockApplicationHandlers,
  ...ChainApplicationHandlers,
  ...EventApplicationHandlers,
  ...OperationApplicationHandlers,
  ...TransactionApplicationHandlers,
];
