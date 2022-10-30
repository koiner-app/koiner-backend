import { provideEventHandlers } from '@koiner/nestjs-utils';
import { AddEventLogOnStopSignaled } from './add-event-log-on-stop-signaled';
import { AddEventLogOnSynchronizationBatchCompleted } from './add-event-log-on-synchronization-batch-completed';
import { AddEventLogOnSynchronizationBatchFailed } from './add-event-log-on-synchronization-batch-failed';
import { AddEventLogOnSynchronizationBatchStarted } from './add-event-log-on-synchronization-batch-started';
import { AddEventLogOnSynchronizationBatchTimedOut } from './add-event-log-on-synchronization-batch-timed-out';
import { AddEventLogOnSynchronizationCreated } from './add-event-log-on-synchronization-created';
import { AddEventLogOnSynchronizationResumed } from './add-event-log-on-synchronization-resumed';
import { AddEventLogOnSynchronizationStopped } from './add-event-log-on-synchronization-stopped';

export const LogSynchronizationAutomations = [
  ...provideEventHandlers([
    AddEventLogOnStopSignaled,
    AddEventLogOnSynchronizationBatchCompleted,
    AddEventLogOnSynchronizationBatchFailed,
    AddEventLogOnSynchronizationBatchStarted,
    AddEventLogOnSynchronizationBatchTimedOut,
    AddEventLogOnSynchronizationCreated,
    AddEventLogOnSynchronizationResumed,
    AddEventLogOnSynchronizationStopped,
  ]),
];
