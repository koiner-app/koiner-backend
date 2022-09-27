import { EmitChainAddressUsedQueueEvents } from './emit-chain-address-used-queue-events';
import { EmitContractsAddressUsedQueueEvents } from './emit-contracts-address-used-queue-events';
import { EmitTokenizeAddressUsedQueueEvents } from './emit-tokenize-address-used-queue-events';

export const ChainAmqpSubscribeHandlers = [
  EmitChainAddressUsedQueueEvents,
  EmitContractsAddressUsedQueueEvents,
  EmitTokenizeAddressUsedQueueEvents,
];
