import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TokenOperationQuery extends ItemQuery {}
export class TokenOperationsQuery extends SearchQuery {}

import { TokenOperationHandler } from './token-operation.handler';
import { TokenOperationsHandler } from './token-operations.handler';

export const TokenOperationQueryHandlers = [
  TokenOperationHandler,
  TokenOperationsHandler,
];
