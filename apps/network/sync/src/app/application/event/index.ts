import { ResumeSyncOnSynchronizationTimedOut } from './sync/resume-sync-on-synchronization-timed-out';
import { SyncBlockRewardsOnSynchronizationBatchStarted } from './sync/sync-block-rewards-on-synchronization-batch-started';

export const NetworkSyncEventHandlers = [
  // EventEmitter
  ResumeSyncOnSynchronizationTimedOut,
  SyncBlockRewardsOnSynchronizationBatchStarted,
];
