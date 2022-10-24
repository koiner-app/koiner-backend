import { TokenContractApplicationHandlers } from './contract';
import { TokenEventApplicationHandlers } from './event';
import { TokenHolderApplicationHandlers } from './holder';
import { TokenOperationApplicationHandlers } from './operation';
import { StatsApplicationHandlers } from './stats';

export * from './contract';
export * from './event';
export * from './holder';
export * from './operation';
export * from './stats';

export const TokenizeModuleApplicationHandlers = [
  ...TokenContractApplicationHandlers,
  ...TokenEventApplicationHandlers,
  ...TokenHolderApplicationHandlers,
  ...TokenOperationApplicationHandlers,
  ...StatsApplicationHandlers,
];
