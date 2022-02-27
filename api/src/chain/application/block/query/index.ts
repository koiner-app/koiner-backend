import { BlockHandler } from './block.handler';
import { BlocksHandler } from './blocks.handler';

export { BlockQuery } from './block.query';
export { BlocksQuery } from './blocks.query';

export default {
  handlers: [BlockHandler, BlocksHandler],
};
