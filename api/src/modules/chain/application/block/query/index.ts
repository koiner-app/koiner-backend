import { SearchQuery } from '@appvise/domain';

export { BlockQuery } from './dto/block.query';
export class BlocksQuery extends SearchQuery {}

import { BlockHandler } from './block.handler';
import { BlocksHandler } from './blocks.handler';

export const BlockQueryHandlers = [BlockHandler, BlocksHandler];
