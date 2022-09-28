import { EmitEventsContractEventsQueue } from './emit-events-contract-events-queue';
import { EmitEventsContractOperationsQueue } from './emit-events-contract-operations-queue';

export const ContractsAmqpSubscribeHandlers = [
  EmitEventsContractEventsQueue,
  EmitEventsContractOperationsQueue,
];
