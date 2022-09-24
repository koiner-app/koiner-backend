import { TokenOperationCommandHandlers } from './command';
import { TokenOperationEventHandlers } from './event';
import { TokenOperationQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const TokenOperationApplicationHandlers = [
  ...TokenOperationCommandHandlers,
  ...TokenOperationEventHandlers,
  ...TokenOperationQueryHandlers,
];
