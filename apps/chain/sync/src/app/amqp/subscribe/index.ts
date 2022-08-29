import { BlockAcceptedHandler } from './block-accepted.handler';
import { EmitChainSyncQueueEvents } from './emit-contracts-sync-queue-events';

const BlockAcceptedHandlerWrapper = [];

if (process.env.SYNC_MODE !== 'manual' ?? BlockAcceptedHandler) {
  BlockAcceptedHandlerWrapper.push(BlockAcceptedHandler);
}

export const ChainAmqpSubscribeHandlers = [
  ...BlockAcceptedHandlerWrapper,
  EmitChainSyncQueueEvents,
];
