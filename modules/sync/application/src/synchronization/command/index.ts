import { CompleteBatchHandler } from './complete-batch.handler';
import { CreateStopSignalHandler } from './create-stop-signal.handler';
import { DeleteStopSignalHandler } from './delete-stop-signal.handler';
import { MarkBatchAsFailedHandler } from './mark-batch-as-failed.handler';
import { ResumeSynchronizationHandler } from './resume-synchronization.handler';
import { StartSynchronizationBatchHandler } from './start-synchronization-batch.handler';

export { CompleteBatchCommand } from './dto/complete-batch.command';
export { CreateStopSignalCommand } from './dto/create-stop-signal.command';
export { DeleteStopSignalCommand } from './dto/delete-stop-signal.command';
export { MarkBatchAsFailedCommand } from './dto/mark-batch-as-failed.command';
export { ResumeSynchronizationCommand } from './dto/resume-synchronization.command';
export { StartSynchronizationBatchCommand } from './dto/start-synchronization-batch.command';

export const SynchronizationCommandHandlers = [
  CompleteBatchHandler,
  CreateStopSignalHandler,
  DeleteStopSignalHandler,
  MarkBatchAsFailedHandler,
  ResumeSynchronizationHandler,
  StartSynchronizationBatchHandler,
];
