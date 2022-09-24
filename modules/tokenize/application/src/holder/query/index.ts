import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TokenHolderQuery extends ItemQuery {}
export class TokenHoldersQuery extends SearchQuery {}

import { TokenHolderHandler } from './token-holder.handler';
import { TokenHoldersHandler } from './token-holders.handler';

export const TokenHolderQueryHandlers = [
  TokenHolderHandler,
  TokenHoldersHandler,
];
