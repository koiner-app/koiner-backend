import { BlockProductionCommandHandlers } from './command';
import { BlockProductionEventHandlers } from './event';
import { BlockProductionQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const BlockProductionApplicationHandlers = [
  ...BlockProductionCommandHandlers,
  ...BlockProductionEventHandlers,
  ...BlockProductionQueryHandlers,
];
