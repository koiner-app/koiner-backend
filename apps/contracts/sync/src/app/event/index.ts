import { CreateBlockRewardForNewBlock } from './create-block-reward-for-new-block';
import { CreateContractOperationForNewOperation } from './create-contract-operation-for-new-operation';

export const ContractsSyncEventHandlers = [
  CreateBlockRewardForNewBlock,
  CreateContractOperationForNewOperation,
];
