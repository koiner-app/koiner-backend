import { EventEmitter2 } from '@nestjs/event-emitter';
import { Logger } from '@appvise/domain';
import { provideEventHandler } from '@koiner/nestjs-utils';
import { ConsoleLogOnBatchCompleted } from './console-log-on-batch-completed';
import { ConsoleLogOnBatchFailed } from './console-log-on-batch-failed';
import { EmitSynchronizationBatchStarted } from './emit-synchronization-batch-started';
import { EmitSynchronizationTimedOut } from './emit-synchronization-timed-out';
import { RemoveStopSignalOnSynchronizationStopped } from './remove-stop-signal-on-synchronization-stopped';

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
  {
    provide: EmitSynchronizationBatchStarted,
    useFactory: (
      eventEmitter: EventEmitter2
    ): EmitSynchronizationBatchStarted => {
      const eventHandler = new EmitSynchronizationBatchStarted(eventEmitter);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [EventEmitter2],
  },
  {
    provide: EmitSynchronizationTimedOut,
    useFactory: (eventEmitter: EventEmitter2): EmitSynchronizationTimedOut => {
      const eventHandler = new EmitSynchronizationTimedOut(eventEmitter);

      eventHandler.listen();

      return eventHandler;
    },
    inject: [EventEmitter2],
  },
];
