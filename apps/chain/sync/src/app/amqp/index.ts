import { ChainAmqpPublishHandlers } from './publish';
import { ChainAmqpSubscribeHandlers } from './subscribe';

export const ChainAmqpHandlers = [
  ...ChainAmqpPublishHandlers,
  ...ChainAmqpSubscribeHandlers,
];
