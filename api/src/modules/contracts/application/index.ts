import ContractCommands from './contract/command';
import ContractQueries from './contract/query';

import OperationCommands from './operation/command';
import OperationQueries from './operation/query';

import TokenContractCommands from './token/command';
import TokenContractEventHandlers from './token/event';
import TokenContractQueries from './token/query';

export default [
  ...ContractCommands.handlers,
  ...ContractQueries.handlers,

  ...OperationCommands.handlers,
  ...OperationQueries.handlers,

  ...TokenContractCommands.handlers,
  ...TokenContractEventHandlers,
  ...TokenContractQueries.handlers,
];
