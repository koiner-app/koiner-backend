import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TokenContractQuery extends ItemQuery {}
export class TokenContractsQuery extends SearchQuery {}

import { TokenContractHandler } from './token-contract.handler';
import { TokenContractsHandler } from './token-contracts.handler';

export const TokenContractQueryHandlers = [
  TokenContractHandler,
  TokenContractsHandler,
];
