import { Logger } from '@appvise/domain';
import { ConsoleLogOnBatchCompleted } from './console-log-on-batch-completed';
import { ConsoleLogOnBatchFailed } from './console-log-on-batch-failed';
import { RemoveStopSignalOnSynchronizationStopped } from './remove-stop-signal-on-synchronization-stopped';
import { provideEventHandler } from '@koiner/nestjs-utils';

export const SynchronizationEventHandlers = [
  provideEventHandler(RemoveStopSignalOnSynchronizationStopped),

  {
    provide: ConsoleLogOnBatchCompleted,
    useFactory: (logger: Logger): ConsoleLogOnBatchCompleted => {
      const eventHandler = new ConsoleLogOnBatchCompleted(logger);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [Logger],
  },
  {
    provide: ConsoleLogOnBatchFailed,
    useFactory: (logger: Logger): ConsoleLogOnBatchFailed => {
      const eventHandler = new ConsoleLogOnBatchFailed(logger);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [Logger],
  },
];
