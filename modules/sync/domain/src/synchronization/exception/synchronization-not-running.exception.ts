import { ConflictException } from '@appvise/domain';

export class SynchronizationNotRunningException extends ConflictException {
  constructor(message = 'Synchronization not running') {
    super(message);
  }
}
