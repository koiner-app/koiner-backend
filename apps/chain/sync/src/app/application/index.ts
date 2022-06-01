import { ChainSyncCommandHandlers } from './command';
import { ChainSyncEventHandlers } from './event';

export * from './command';
export * from './event';

export const ChainSyncApplicationHandlers = [
  ...ChainSyncCommandHandlers,
  ...ChainSyncEventHandlers,
];
