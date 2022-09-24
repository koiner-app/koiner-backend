import { BlockRewardApplicationHandlers } from './block-reward';
import { ContractApplicationHandlers } from './contract';

export * from './block-reward';
export * from './contract';

export const ContractsModuleApplicationHandlers = [
  ...BlockRewardApplicationHandlers,
  ...ContractApplicationHandlers,
];
