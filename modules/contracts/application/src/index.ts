import { AddressApplicationHandlers } from './address';
import { BlockRewardApplicationHandlers } from './block-reward';
import { ContractApplicationHandlers } from './contract';

export * from './address';
export * from './block-reward';
export * from './contract';

export const ContractsModuleApplicationHandlers = [
  ...AddressApplicationHandlers,
  ...BlockRewardApplicationHandlers,
  ...ContractApplicationHandlers,
];
