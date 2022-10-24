import { ItemQuery } from '@appvise/domain';

export class ChainQuery extends ItemQuery {}

import { ChainHandler } from './chain.handler';

export const ChainQueryHandlers = [ChainHandler];
