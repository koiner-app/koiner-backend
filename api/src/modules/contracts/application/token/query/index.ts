import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TokenContractQuery extends ItemQuery {}
export class TokenContractsQuery extends SearchQuery {}
export class TokenOperationQuery extends ItemQuery {}
export class TokenOperationsQuery extends SearchQuery {}

import { TokenContractHandler } from './token-contract.handler';
import { TokenContractsHandler } from './token-contracts.handler';
import { TokenOperationHandler } from './token-operation.handler';
import { TokenOperationsHandler } from './token-operations.handler';

export default {
  handlers: [
    TokenContractHandler,
    TokenContractsHandler,
    TokenOperationHandler,
    TokenOperationsHandler,
  ],
};
