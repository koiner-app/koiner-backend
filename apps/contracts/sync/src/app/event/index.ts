import { CreateBlockRewardForNewBlock } from './create-block-reward-for-new-block';
import { CreateContractForUploadedContract } from './create-contract-for-uploaded-contract';
import { CreateContractEventForNewEvent } from './create-contract-event-for-new-event';
import { CreateContractOperationForNewOperation } from './create-contract-operation-for-new-operation';

export const ContractsSyncEventHandlers = [
  CreateContractForUploadedContract,
  CreateBlockRewardForNewBlock,
  CreateContractEventForNewEvent,
  CreateContractOperationForNewOperation,
];
