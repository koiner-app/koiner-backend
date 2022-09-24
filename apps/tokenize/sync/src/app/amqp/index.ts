import { TokenizeAmqpPublishHandlers } from './publish';
import { TokenizeAmqpSubscribeHandlers } from './subscribe';

export const TokenizeAmqpHandlers = [
  ...TokenizeAmqpPublishHandlers,
  ...TokenizeAmqpSubscribeHandlers,
];
