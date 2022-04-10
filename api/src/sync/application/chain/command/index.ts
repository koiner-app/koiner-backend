import { SyncOperationsHandler } from './sync-operations.handler';
import { SyncTransactionsHandler } from './sync-transactions.handler';

export { SyncOperationsCommand } from './dto/sync-operations.command';
export { SyncTransactionsCommand } from './dto/sync-transactions.command';

export default {
  handlers: [SyncOperationsHandler, SyncTransactionsHandler],
};
