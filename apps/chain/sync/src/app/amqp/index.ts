import { ChainAmqpPublishHandlers } from './publish';
import { ChainAmqpSubscribeHandlers } from './subscribe';
import { ChainSubscriptionPublishers } from './subscriptions';

export const ChainAmqpHandlers = [
  ...ChainAmqpPublishHandlers,
  ...ChainAmqpSubscribeHandlers,
  ...ChainSubscriptionPublishers,
];
