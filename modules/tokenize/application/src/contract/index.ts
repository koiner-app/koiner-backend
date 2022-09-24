import { TokenContractCommandHandlers } from './command';
import { TokenContractEventHandlers } from './event';
import { TokenContractQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const TokenContractApplicationHandlers = [
  ...TokenContractCommandHandlers,
  ...TokenContractEventHandlers,
  ...TokenContractQueryHandlers,
];
