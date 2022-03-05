import AddressCommands from './address/command';
import AddressEventHandlers from './address/event';
import AddressQueries from './address/query';

import BlockCommands from './block/command';
import BlockEventHandlers from './block/event';
import BlockQueries from './block/query';

import ContractCommands from './contract/command';
import ContractEventHandlers from './contract/event';
import ContractQueries from './contract/query';

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

  ...ContractCommands.handlers,
  ...ContractEventHandlers,
  ...ContractQueries.handlers,

  ...TransactionCommands.handlers,
  ...TransactionEventHandlers,
  ...TransactionQueries.handlers,
];
