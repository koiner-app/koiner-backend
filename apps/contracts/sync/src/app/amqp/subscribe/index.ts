import { EmitUploadContractOperationCreated } from './contract/emit-upload-contract-operation-created';
import { EmitBlockCreatedFromEventQueue } from './event/emit-block-created-from-event-queue';
import { EmitTransactionCreatedFromEventQueue } from './event/emit-transaction-created-from-event-queue';
import { EmitTransactionCreatedFromOperationQueue } from './operation/emit-transaction-created-from-operation-queue';

export const ContractsAmqpSubscribeHandlers = [
  // Contract
  EmitUploadContractOperationCreated,

  // Event
  EmitBlockCreatedFromEventQueue,
  EmitTransactionCreatedFromEventQueue,

  // Operation
  EmitTransactionCreatedFromOperationQueue,
];
