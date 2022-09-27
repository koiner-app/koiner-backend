import { ItemQuery, SearchQuery } from '@appvise/domain';

export class SynchronizationQuery extends ItemQuery {}
export class SynchronizationsQuery extends SearchQuery {}

import { SynchronizationHandler } from './synchronization.handler';
import { SynchronizationsHandler } from './synchronizations.handler';

export const SynchronizationQueryHandlers = [
  SynchronizationHandler,
  SynchronizationsHandler,
];
