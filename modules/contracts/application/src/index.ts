import { AddressApplicationHandlers } from './address';
import { BlockRewardApplicationHandlers } from './block-reward';
import { ContractApplicationHandlers } from './contract';
import { ContractStandardApplicationHandlers } from './contract-standard';
import { TokenApplicationHandlers } from './token';

export * from './address';
export * from './block-reward';
export * from './contract';
export * from './contract-standard';
export * from './token';

export const ContractsModuleApplicationHandlers = [
  ...AddressApplicationHandlers,
  ...BlockRewardApplicationHandlers,
  ...ContractApplicationHandlers,
  ...ContractStandardApplicationHandlers,
  ...TokenApplicationHandlers,
];
