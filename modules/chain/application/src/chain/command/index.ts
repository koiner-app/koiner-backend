import { CreateChainHandler } from './create-chain.handler';
import { CompleteInitialSyncHandler } from './complete-initial-sync.handler';
import { UpdateChainHandler } from './update-chain.handler';

export { CreateChainCommand } from './dto/create-chain.command';
export { CompleteInitialSyncCommand } from './dto/complete-initial-sync.command';
export { UpdateChainCommand } from './dto/update-chain.command';

export const ChainCommandHandlers = [
  CreateChainHandler,
  CompleteInitialSyncHandler,
  UpdateChainHandler,
];
