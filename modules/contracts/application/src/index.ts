import { AddressApplicationHandlers } from './address';
import { BlockRewardApplicationHandlers } from './block-reward';
import { ContractApplicationHandlers } from './contract';
import { ContractOperationApplicationHandlers } from './operation';
import { ContractStandardApplicationHandlers } from './contract-standard';
import { TokenApplicationHandlers } from './token';

export * from './address';
export * from './block-reward';
export * from './contract';
export * from './contract-standard';
export * from './operation';
export * from './token';

export const ContractsApplicationHandlers = [
  ...AddressApplicationHandlers,
  ...BlockRewardApplicationHandlers,
  ...ContractApplicationHandlers,
  ...ContractOperationApplicationHandlers,
  ...ContractStandardApplicationHandlers,
  ...TokenApplicationHandlers,
];
