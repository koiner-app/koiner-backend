import { CreateKrc20ContractHandler } from './create-krc20-contract.handler';
import { CreateBlockRewardHandler } from './create-block-reward.handler';
import { CreateKrc20OperationHandler } from './create-krc20-operation.handler';
import { UpdateKrc20BalanceHandler } from './update-krc20-balance.handler';
import { UpdateKrc20ContractStatsHandler } from './update-krc20-stats.handler';
import { UpdateKrc20TotalSupplyHandler } from './update-krc20-total-supply.handler';

export { CreateKrc20ContractCommand } from './dto/create-krc20-contract.command';
export { CreateBlockRewardCommand } from './dto/create-block-reward.command';
export { CreateKrc20OperationCommand } from './dto/create-krc20-operation.command';
export { UpdateKrc20BalanceCommand } from './dto/update-krc20-balance.command';
export { UpdateKrc20ContractStatsCommand } from './dto/update-krc20-stats.command';
export { UpdateKrc20TotalSupplyCommand } from './dto/update-krc20-total-supply.command';

export default {
  handlers: [
    CreateKrc20ContractHandler,
    CreateBlockRewardHandler,
    CreateKrc20OperationHandler,
    UpdateKrc20BalanceHandler,
    UpdateKrc20ContractStatsHandler,
    UpdateKrc20TotalSupplyHandler,
  ],
};
