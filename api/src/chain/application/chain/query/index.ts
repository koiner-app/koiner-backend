import { ItemQuery, SearchQuery } from '@appvise/domain';

export class ChainQuery extends ItemQuery {}
export class ChainsQuery extends SearchQuery {}

import { ChainHandler } from './chain.handler';
import { ChainsHandler } from './chains.handler';

export default {
  handlers: [ChainHandler, ChainsHandler],
};
