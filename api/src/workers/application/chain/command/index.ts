import { SyncBlocksHandler } from './sync-blocks.handler';
import { SyncOperationsHandler } from './sync-operations.handler';
import { SyncTransactionsHandler } from './sync-transactions.handler';

export { SyncBlocksCommand } from './dto/sync-blocks.command';
export { SyncOperationsCommand } from './dto/sync-operations.command';
export { SyncTransactionsCommand } from './dto/sync-transactions.command';

export default {
  handlers: [SyncBlocksHandler, SyncOperationsHandler, SyncTransactionsHandler],
};
