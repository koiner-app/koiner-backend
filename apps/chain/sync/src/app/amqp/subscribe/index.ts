import { EmitChainAddressUsedQueueEvents } from './emit-chain-address-used-queue-events';
import { EmitContractsAddressUsedQueueEvents } from './emit-contracts-address-used-queue-events';
import { EmitNetworkAddressUsedQueueEvents } from './emit-network-address-used-queue-events';
import { EmitTokenizeAddressUsedQueueEvents } from './emit-tokenize-address-used-queue-events';
import { UpdateChainStatsFromChainEventsQueue } from './update-chain-stats-from-chain-events-queue';

export const ChainAmqpSubscribeHandlers = [
  EmitChainAddressUsedQueueEvents,
  EmitContractsAddressUsedQueueEvents,
  EmitNetworkAddressUsedQueueEvents,
  EmitTokenizeAddressUsedQueueEvents,
  UpdateChainStatsFromChainEventsQueue,
];
