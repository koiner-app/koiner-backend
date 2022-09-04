import { EmitEventsBlockRewardsQueue } from './emit-events-block-rewards-queue';
import { EmitEventsContractQueue } from './emit-events-contract-queue';
import { EmitEventsTokenQueue } from './emit-events-token-queue';

export const ContractsAmqpSubscribeHandlers = [
  EmitEventsBlockRewardsQueue,
  EmitEventsContractQueue,
  EmitEventsTokenQueue,
];
