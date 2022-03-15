import { ItemQuery, SearchQuery } from '@appvise/domain';

export class OperationQuery extends ItemQuery {}
export class OperationsQuery extends SearchQuery {}

import { OperationHandler } from './operation.handler';
import { OperationsHandler } from './operations.handler';

export default {
  handlers: [OperationHandler, OperationsHandler],
};
