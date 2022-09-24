import { EmitEventsBlockRewardsQueue } from './emit-events-block-rewards-queue';
import { EmitEventsContractQueue } from './emit-events-contract-queue';

export const ContractsAmqpSubscribeHandlers = [
  EmitEventsBlockRewardsQueue,
  EmitEventsContractQueue,
];
