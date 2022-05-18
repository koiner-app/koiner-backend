import { ItemQuery, SearchQuery } from '@appvise/domain';

export { BlockRewardQuery } from './dto/block-reward.query';
export class BlockRewardsQuery extends SearchQuery {}
export class TokenContractQuery extends ItemQuery {}
export class TokenContractsQuery extends SearchQuery {}
export class TokenOperationQuery extends ItemQuery {}
export class TokenOperationsQuery extends SearchQuery {}

import { BlockRewardHandler } from './block-reward.handler';
import { BlockRewardsHandler } from './block-rewards.handler';
import { TokenContractHandler } from './token-contract.handler';
import { TokenContractsHandler } from './token-contracts.handler';
import { TokenOperationHandler } from './token-operation.handler';
import { TokenOperationsHandler } from './token-operations.handler';

export const TokenQueryHandlers = [
  BlockRewardHandler,
  BlockRewardsHandler,
  TokenContractHandler,
  TokenContractsHandler,
  TokenOperationHandler,
  TokenOperationsHandler,
];
