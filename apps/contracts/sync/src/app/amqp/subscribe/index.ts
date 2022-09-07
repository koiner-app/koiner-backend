import { EmitEventsBlockRewardsQueue } from './emit-events-block-rewards-queue';
import { EmitEventsContractQueue } from './emit-events-contract-queue';
import { EmitEventsTokenHolderQueue } from './emit-events-token-holder-queue';
import { EmitEventsTokenSupplyQueue } from './emit-events-token-supply-queue';
import { EmitEventsTokenQueue } from './emit-events-token-queue';

export const ContractsAmqpSubscribeHandlers = [
  EmitEventsBlockRewardsQueue,
  EmitEventsContractQueue,
  EmitEventsTokenHolderQueue,
  EmitEventsTokenQueue,
  EmitEventsTokenSupplyQueue,
];
