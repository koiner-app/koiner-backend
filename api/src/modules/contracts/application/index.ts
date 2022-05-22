import { BlockRewardApplicationHandlers } from './block-reward';
import { ContractApplicationHandlers } from './contract';
import { ContractOperationApplicationHandlers } from './operation';
import { ContractStandardApplicationHandlers } from './contract-standard';
import { TokenApplicationHandlers } from './token';

export * from './block-reward';
export * from './contract';
export * from './contract-standard';
export * from './operation';
export * from './token';

export const ContractsApplicationHandlers = [
  ...BlockRewardApplicationHandlers,
  ...ContractApplicationHandlers,
  ...ContractOperationApplicationHandlers,
  ...ContractStandardApplicationHandlers,
  ...TokenApplicationHandlers,
];
