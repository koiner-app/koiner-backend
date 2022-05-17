import { ContractApplicationHandlers } from './contract';
import { ContractOperationApplicationHandlers } from './operation';
import { ContractStandardApplicationHandlers } from './contract-standard';
import { TokenApplicationHandlers } from './token';

export * from './contract';
export * from './contract-standard';
export * from './operation';
export * from './token';

export const ContractsApplicationHandlers = [
  ...ContractApplicationHandlers,
  ...ContractOperationApplicationHandlers,
  ...ContractStandardApplicationHandlers,
  ...TokenApplicationHandlers,
];
