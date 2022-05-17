import { CreateChainHandler } from './create-chain.handler';
import { UpdateChainHandler } from './update-chain.handler';

export { CreateChainCommand } from './dto/create-chain.command';
export { UpdateChainCommand } from './dto/update-chain.command';

export const ChainCommandHandlers = [CreateChainHandler, UpdateChainHandler];
