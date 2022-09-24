import { BlockAcceptedHandler } from './block-accepted.handler';
import { EmitChainAddressUsedQueueEvents } from './emit-chain-address-used-queue-events';
import { EmitContractsAddressUsedQueueEvents } from './emit-contracts-address-used-queue-events';
import { EmitTokenizeAddressUsedQueueEvents } from './emit-tokenize-address-used-queue-events';

const BlockAcceptedHandlerWrapper = [];

if (process.env.SYNC_MODE !== 'manual') {
  BlockAcceptedHandlerWrapper.push(BlockAcceptedHandler);
}

export const ChainAmqpSubscribeHandlers = [
  ...BlockAcceptedHandlerWrapper,
  EmitChainAddressUsedQueueEvents,
  EmitContractsAddressUsedQueueEvents,
  EmitTokenizeAddressUsedQueueEvents,
];
