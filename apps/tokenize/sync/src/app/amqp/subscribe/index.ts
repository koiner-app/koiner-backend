import { EmitEventsTokenHolderQueue } from './emit-events-token-holder-queue';
import { EmitEventsTokenSupplyQueue } from './emit-events-token-supply-queue';
import { EmitEventsTokenQueue } from './emit-events-token-queue';

export const TokenizeAmqpSubscribeHandlers = [
  EmitEventsTokenHolderQueue,
  EmitEventsTokenQueue,
  EmitEventsTokenSupplyQueue,
];
