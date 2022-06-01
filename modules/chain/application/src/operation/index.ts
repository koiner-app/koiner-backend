import { OperationCommandHandlers } from './command';
import { OperationQueryHandlers } from './query';

export * from './command';
export * from './query';

export const OperationApplicationHandlers = [
  ...OperationCommandHandlers,
  ...OperationQueryHandlers,
];
