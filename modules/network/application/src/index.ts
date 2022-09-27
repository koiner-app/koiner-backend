import { BlockProductionApplicationHandlers } from './block-production';

export * from './block-production';

export const NetworkModuleApplicationHandlers = [
  ...BlockProductionApplicationHandlers,
];
