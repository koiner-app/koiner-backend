import { ContractSchema } from './contract/contract.schema';
import { ContractOperationSchema } from './operation/contract-operation.schema';
import { BlockRewardSchema } from './token/block-reward.schema';
import { BlockRewardBalanceSchema } from './token/block-reward-balance.schema';
import { TokenBalanceSchema } from './token/token-balance.schema';
import { TokenContractSchema } from './token/token-contract.schema';
import { TokenOperationSchema } from './token/token-operation.schema';

export default [
  ContractSchema,
  ContractOperationSchema,

  // Token
  BlockRewardSchema,
  BlockRewardBalanceSchema,
  TokenBalanceSchema,
  TokenContractSchema,
  TokenOperationSchema,
];
