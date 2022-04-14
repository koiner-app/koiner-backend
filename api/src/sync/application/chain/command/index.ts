import { SyncBlockHandler } from './sync-block.handler';
import { SyncBlocksHandler } from './sync-blocks.handler';
import { SyncTransactionsHandler } from './sync-transactions.handler';

export { SyncBlockCommand } from './dto/sync-block.command';
export { SyncBlocksCommand } from './dto/sync-blocks.command';
export { SyncTransactionsCommand } from './dto/sync-transactions.command';

export default {
  handlers: [SyncBlockHandler, SyncBlocksHandler, SyncTransactionsHandler],
};
