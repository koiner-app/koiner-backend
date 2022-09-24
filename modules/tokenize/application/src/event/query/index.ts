import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TokenEventQuery extends ItemQuery {}
export class TokenEventsQuery extends SearchQuery {}

import { TokenEventHandler } from './token-event.handler';
import { TokenEventsHandler } from './token-events.handler';

export const TokenEventQueryHandlers = [TokenEventHandler, TokenEventsHandler];
