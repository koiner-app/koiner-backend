import { BlockAcceptedHandler } from './block-accepted.handler';
import { CreateAddressOnContractsAddressCreated } from './create-address-on-contracts-address-created';

const BlockAcceptedHandlerWrapper = [];

if (process.env.SYNC_MODE !== 'manual' ?? BlockAcceptedHandler) {
  BlockAcceptedHandlerWrapper.push(BlockAcceptedHandler);
}

export const ChainAmqpSubscribeHandlers = [
  ...BlockAcceptedHandlerWrapper,
  CreateAddressOnContractsAddressCreated,
];
