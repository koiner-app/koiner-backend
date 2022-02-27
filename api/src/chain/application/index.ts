import BlockCommands from './block/command';
import BlockEventHandlers from './block/event';
import BlockQueries from './block/query';

import TransactionCommands from './transaction/command';
import TransactionEventHandlers from './transaction/event';
import TransactionQueries from './transaction/query';

export default [
  ...BlockCommands.handlers,
  ...BlockEventHandlers,
  ...BlockQueries.handlers,

  ...TransactionCommands.handlers,
  ...TransactionEventHandlers,
  ...TransactionQueries.handlers,
];
