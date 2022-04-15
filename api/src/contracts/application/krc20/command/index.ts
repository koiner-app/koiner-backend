import { CreateKrc20ContractHandler } from './create-krc20-contract.handler';
import { CreateBlockRewardHandler } from './create-block-reward.handler';
import { CreateKrc20OperationHandler } from './create-krc20-operation.handler';
import { UpdateKrc20BalanceHandler } from './update-krc20-balance.handler';
import { UpdateKrc20ContractHandler } from './update-krc20-contract.handler';

export { CreateKrc20ContractCommand } from './dto/create-krc20-contract.command';
export { CreateBlockRewardCommand } from './dto/create-block-reward.command';
export { CreateKrc20OperationCommand } from './dto/create-krc20-operation.command';
export { UpdateKrc20BalanceCommand } from './dto/update-krc20-balance.command';
export { UpdateKrc20ContractCommand } from './dto/update-krc20-contract.command';

export default {
  handlers: [
    CreateKrc20ContractHandler,
    CreateBlockRewardHandler,
    CreateKrc20OperationHandler,
    UpdateKrc20BalanceHandler,
    UpdateKrc20ContractHandler,
  ],
};
