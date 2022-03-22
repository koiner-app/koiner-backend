import AddressCommands from './address/command';
import AddressEventHandlers from './address/event';
import AddressQueries from './address/query';

import BlockCommands from './block/command';
import BlockEventHandlers from './block/event';
import BlockQueries from './block/query';

import ChainCommands from './chain/command';
import ChainEventHandlers from './chain/event';
import ChainQueries from './chain/query';

import OperationCommands from './operation/command';
import OperationQueries from './operation/query';

import TransactionCommands from './transaction/command';
import TransactionEventHandlers from './transaction/event';
import TransactionQueries from './transaction/query';

export default [
  ...AddressCommands.handlers,
  ...AddressEventHandlers,
  ...AddressQueries.handlers,

  ...BlockCommands.handlers,
  ...BlockEventHandlers,
  ...BlockQueries.handlers,

  ...ChainCommands.handlers,
  ...ChainEventHandlers,
  ...ChainQueries.handlers,

  ...OperationCommands.handlers,
  ...OperationQueries.handlers,

  ...TransactionCommands.handlers,
  ...TransactionEventHandlers,
  ...TransactionQueries.handlers,
];
