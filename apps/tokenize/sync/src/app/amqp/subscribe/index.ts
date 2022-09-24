import { EmitEventsTokenHolderQueue } from './emit-events-token-holder-queue';
import { EmitEventsTokenSupplyQueue } from './emit-events-token-supply-queue';
import { EmitEventsTokenContractQueue } from './emit-events-token-contract-queue';
import { EmitEventsTokenEventQueue } from './emit-events-token-event-queue';
import { EmitEventsTokenOperationQueue } from './emit-events-token-operation-queue';

export const TokenizeAmqpSubscribeHandlers = [
  EmitEventsTokenHolderQueue,
  EmitEventsTokenContractQueue,
  EmitEventsTokenEventQueue,
  EmitEventsTokenOperationQueue,
  EmitEventsTokenSupplyQueue,
];
