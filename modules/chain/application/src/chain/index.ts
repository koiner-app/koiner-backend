import { ChainCommandHandlers } from './command';
import { ChainQueryHandlers } from './query';

export * from './command';
export * from './query';

export const ChainApplicationHandlers = [
  ...ChainCommandHandlers,
  ...ChainQueryHandlers,
];
