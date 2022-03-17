import ContractCommands from './contract/command';
import ContractQueries from './contract/query';

import Krc20ContractCommands from './krc20/command';
import Krc20ContractEventHandlers from './krc20/event';
import Krc20ContractQueries from './krc20/query';

export default [
  ...ContractCommands.handlers,
  ...ContractQueries.handlers,

  ...Krc20ContractCommands.handlers,
  ...Krc20ContractEventHandlers,
  ...Krc20ContractQueries.handlers,
];
