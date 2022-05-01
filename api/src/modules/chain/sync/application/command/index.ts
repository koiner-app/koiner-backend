import { SyncBlockHandler } from './sync-block.handler';
import { SyncBlocksHandler } from './sync-blocks.handler';
import { SyncBlockSetsHandler } from './sync-block-sets.handler';
import { SyncTransactionsHandler } from './sync-transactions.handler';

export { SyncBlockCommand } from './dto/sync-block.command';
export { SyncBlocksCommand } from './dto/sync-blocks.command';
export { SyncBlockSetsCommand } from './dto/sync-block-sets.command';
export { SyncTransactionsCommand } from './dto/sync-transactions.command';

export default {
  handlers: [
    SyncBlockHandler,
    SyncBlocksHandler,
    SyncBlockSetsHandler,
    SyncTransactionsHandler,
  ],
};
