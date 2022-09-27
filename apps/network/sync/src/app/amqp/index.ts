import { NetworkAmqpPublishHandlers } from './publish';
import { NetworkAmqpSubscribeHandlers } from './subscribe';

export const NetworkAmqpHandlers = [
  ...NetworkAmqpPublishHandlers,
  ...NetworkAmqpSubscribeHandlers,
];
