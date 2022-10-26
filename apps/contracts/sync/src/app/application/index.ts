import { SyncContractEventsForNewBlock } from './event/event/sync-contract-events-for-new-block';
import { SyncContractEventsForNewTransaction } from './event/event/sync-contract-events-for-new-transaction';
import { SyncContractOperationsForNewTransaction } from './event/operation/sync-contract-operations-for-new-transaction';
import { CreateContractForUploadedContract } from './event/contract/create-contract-for-uploaded-contract';

export const ContractSyncEventHandlers = [
  // EventEmitter
  CreateContractForUploadedContract,
  SyncContractEventsForNewBlock,
  SyncContractEventsForNewTransaction,
  SyncContractOperationsForNewTransaction,
];
