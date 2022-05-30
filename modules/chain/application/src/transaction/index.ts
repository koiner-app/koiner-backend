import { TransactionCommandHandlers } from './command';
import { TransactionQueryHandlers } from './query';

export * from './command';
export * from './query';

export const TransactionApplicationHandlers = [
  ...TransactionCommandHandlers,
  ...TransactionQueryHandlers,
];
