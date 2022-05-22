import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TokenBalanceQuery extends ItemQuery {}
export class TokenBalancesQuery extends SearchQuery {}
export class TokenContractQuery extends ItemQuery {}
export class TokenContractsQuery extends SearchQuery {}
export class TokenOperationQuery extends ItemQuery {}
export class TokenOperationsQuery extends SearchQuery {}

import { TokenBalanceHandler } from './token-balance.handler';
import { TokenBalancesHandler } from './token-balances.handler';
import { TokenContractHandler } from './token-contract.handler';
import { TokenContractsHandler } from './token-contracts.handler';
import { TokenOperationHandler } from './token-operation.handler';
import { TokenOperationsHandler } from './token-operations.handler';

export const TokenQueryHandlers = [
  TokenBalanceHandler,
  TokenBalancesHandler,
  TokenContractHandler,
  TokenContractsHandler,
  TokenOperationHandler,
  TokenOperationsHandler,
];
