import { ContractSchema } from './contract/contract.schema';
import { BlockRewardSchema } from './krc20/block-reward.schema';
import { BlockRewardBalanceSchema } from './krc20/block-reward-balance.schema';
import { Krc20BalanceSchema } from './krc20/krc20-balance.schema';
import { Krc20ContractSchema } from './krc20/krc20-contract.schema';
import { Krc20OperationSchema } from './krc20/krc20-operation.schema';

export default [
  ContractSchema,

  // Krc20
  BlockRewardSchema,
  BlockRewardBalanceSchema,
  Krc20BalanceSchema,
  Krc20ContractSchema,
  Krc20OperationSchema,
];
