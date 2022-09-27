import { StartSynchronizationHandler } from './start-synchronization.handler';
import { UpdateSynchronizationHandler } from './update-synchronization.handler';

export { StartSynchronizationCommand } from './dto/start-synchronization.command';
export { UpdateSynchronizationCommand } from './dto/update-synchronization.command';

export const SynchronizationCommandHandlers = [
  StartSynchronizationHandler,
  UpdateSynchronizationHandler,
];
