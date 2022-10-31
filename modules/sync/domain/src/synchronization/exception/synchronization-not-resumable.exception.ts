import { ConflictException } from '@appvise/domain';

export class SynchronizationNotResumableException extends ConflictException {
  constructor(message = 'Synchronization cannot be resumed') {
    super(message);
  }
}
