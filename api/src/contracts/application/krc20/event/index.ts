import { CreateKrcContractOnContractCreated } from './create-krc-contract-on-contract-created';
import { ConsoleLogOnKrc20ContractCreated } from './console-log-on-krc20-contract-created';
import { CreateKrcOperationOnOperationCreated } from './create-krc-operation-on-operation-created';
import { UpdateKrc20BalanceOnBlockRewardCreated } from '@koiner/contracts/application/krc20/event/update-krc20-balance-on-block-reward-created';
import { UpdateKrc20BalancesOnOperationCreated } from '@koiner/contracts/application/krc20/event/update-krc20-balances-on-operation-created';

export default [
  CreateKrcContractOnContractCreated,
  CreateKrcOperationOnOperationCreated,
  UpdateKrc20BalanceOnBlockRewardCreated,
  UpdateKrc20BalancesOnOperationCreated,
  ConsoleLogOnKrc20ContractCreated,
];
