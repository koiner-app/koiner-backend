import { BlockAcceptedHandler } from './block-accepted.handler';
import { EmitChainSyncQueueEvents } from './emit-contracts-sync-queue-events';

const BlockAcceptedHandlerWrapper = [];

console.log('process.env.SYNC_MODE');
if (process.env.SYNC_MODE !== 'manual') {
  console.log('LOAD IT!');
  BlockAcceptedHandlerWrapper.push(BlockAcceptedHandler);
}

export const ChainAmqpSubscribeHandlers = [
  ...BlockAcceptedHandlerWrapper,
  EmitChainSyncQueueEvents,
];
