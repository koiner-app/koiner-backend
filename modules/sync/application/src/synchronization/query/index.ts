import { ItemQuery, SearchQuery } from '@appvise/domain';

export class StopSignalQuery extends ItemQuery {}
export class SynchronizationQuery extends ItemQuery {}
export class SynchronizationsQuery extends SearchQuery {}

import { StopSignalHandler } from './stop-signal.handler';
import { SynchronizationHandler } from './synchronization.handler';
import { SynchronizationsHandler } from './synchronizations.handler';

export const SynchronizationQueryHandlers = [
  StopSignalHandler,
  SynchronizationHandler,
  SynchronizationsHandler,
];
