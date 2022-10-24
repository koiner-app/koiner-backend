import { CreateOrUpdateChainHandler } from './create-or-update-chain.handler';

export { CreateOrUpdateChainCommand } from './dto/create-or-update-chain.command';

export const ChainCommandHandlers = [CreateOrUpdateChainHandler];
