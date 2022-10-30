import { NetworkSyncCommandHandlers } from './command';
import { NetworkSyncEventHandlers } from './event';

export * from './command';

export const NetworkSyncApplicationHandlers = [
  ...NetworkSyncCommandHandlers,
  ...NetworkSyncEventHandlers,
];
