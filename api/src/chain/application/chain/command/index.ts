import { CreateChainHandler } from './create-chain.handler';
import { UpdateChainHandler } from './update-chain.handler';
import { UpdateChainStatsHandler } from './update-chain-stats.handler';

export { CreateChainCommand } from './dto/create-chain.command';
export { UpdateChainCommand } from './dto/update-chain.command';
export { UpdateChainStatsCommand } from './dto/update-chain-stats.command';

export default {
  handlers: [CreateChainHandler, UpdateChainHandler, UpdateChainStatsHandler],
};
