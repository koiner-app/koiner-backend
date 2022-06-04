import { BlockAcceptedHandler } from './block-accepted.handler';

const conditionalServices = [];

if (process.env.SYNC_MODE !== 'manual' ?? BlockAcceptedHandler) {
  conditionalServices.push(BlockAcceptedHandler);
}

export const ChainAmqpSubscribeHandlers = [...conditionalServices];
