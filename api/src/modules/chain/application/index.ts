import AddressCommands from './address/command';
import AddressQueries from './address/query';

import BlockCommands from './block/command';
import BlockQueries from './block/query';

import ChainCommands from './chain/command';
import ChainQueries from './chain/query';

import EventCommands from './event/command';
import EventQueries from './event/query';

import OperationCommands from './operation/command';
import OperationQueries from './operation/query';

import TransactionCommands from './transaction/command';
import TransactionQueries from './transaction/query';

export default [
  ...AddressCommands.handlers,
  ...AddressQueries.handlers,

  ...BlockCommands.handlers,
  ...BlockQueries.handlers,

  ...ChainCommands.handlers,
  ...ChainQueries.handlers,

  ...EventCommands.handlers,
  ...EventQueries.handlers,

  ...OperationCommands.handlers,
  ...OperationQueries.handlers,

  ...TransactionCommands.handlers,
  ...TransactionQueries.handlers,
];
