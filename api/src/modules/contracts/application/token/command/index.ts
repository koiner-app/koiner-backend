import { CreateTokenContractHandler } from './create-token-contract.handler';
import { CreateBlockRewardHandler } from './create-block-reward.handler';
import { UpdateBlockRewardBalanceHandler } from './update-block-reward-balance.handler';
import { CreateTokenOperationHandler } from './create-token-operation.handler';
import { UpdateTokenBalanceHandler } from './update-token-balance.handler';
import { UpdateTokenContractHandler } from './update-token-contract.handler';

export { CreateTokenContractCommand } from './dto/create-token-contract.command';
export { CreateBlockRewardCommand } from './dto/create-block-reward.command';
export { UpdateBlockRewardBalanceCommand } from './dto/update-block-reward-balance.command';
export { CreateTokenOperationCommand } from './dto/create-token-operation.command';
export { UpdateTokenBalanceCommand } from './dto/update-token-balance.command';
export { UpdateTokenContractCommand } from './dto/update-token-contract.command';

export const TokenCommandHandlers = [
  CreateTokenContractHandler,
  CreateBlockRewardHandler,
  UpdateBlockRewardBalanceHandler,
  CreateTokenOperationHandler,
  UpdateTokenBalanceHandler,
  UpdateTokenContractHandler,
];
