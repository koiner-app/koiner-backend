import { CreateBlockRewardForNewBlock } from './create-block-reward-for-new-block';
import { CreateContractForUploadedContract } from './create-contract-for-uploaded-contract';
import { CreateContractOperationForNewOperation } from './create-contract-operation-for-new-operation';
import { EmitChainSyncQueueEvents } from './emit-chain-sync-queue-events';

export const ContractsSyncEventHandlers = [
  EmitChainSyncQueueEvents,
  CreateContractForUploadedContract,
  CreateBlockRewardForNewBlock,
  CreateContractOperationForNewOperation,
];
