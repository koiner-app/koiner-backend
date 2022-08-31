import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TokenContractQuery extends ItemQuery {}
export class TokenContractsQuery extends SearchQuery {}
export class TokenEventQuery extends ItemQuery {}
export class TokenEventsQuery extends SearchQuery {}
export class TokenHolderQuery extends ItemQuery {}
export class TokenHoldersQuery extends SearchQuery {}
export class TokenOperationQuery extends ItemQuery {}
export class TokenOperationsQuery extends SearchQuery {}

import { TokenContractHandler } from './token-contract.handler';
import { TokenContractsHandler } from './token-contracts.handler';
import { TokenEventHandler } from './token-event.handler';
import { TokenEventsHandler } from './token-events.handler';
import { TokenHolderHandler } from './token-holder.handler';
import { TokenHoldersHandler } from './token-holders.handler';
import { TokenOperationHandler } from './token-operation.handler';
import { TokenOperationsHandler } from './token-operations.handler';

export const TokenQueryHandlers = [
  TokenContractHandler,
  TokenContractsHandler,
  TokenEventHandler,
  TokenEventsHandler,
  TokenHolderHandler,
  TokenHoldersHandler,
  TokenOperationHandler,
  TokenOperationsHandler,
];
