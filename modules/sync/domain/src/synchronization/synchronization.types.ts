export interface CreateSynchronizationProps {
  headTopologyHeight: number;
  lastIrreversibleBlock: number;
  lastSyncedBlock?: number;
}

export interface SynchronizationProps extends CreateSynchronizationProps {
  batchStartedAt?: number;
  batchStartHeight?: number;
  batchEndHeight?: number;
  lastSyncedBlock: number;
  lastError?: Record<string, any>;
  syncing: boolean;
  stopped: boolean;
  stoppedAt?: number;
}

export interface StartNextBatchProps {
  headTopologyHeight: number;
  lastIrreversibleBlock: number;
  startHeight: number;
  endHeight: number;
}

export interface CompleteBatchProps {
  headTopologyHeight: number;
  lastIrreversibleBlock: number;
  lastSyncedBlock: number;
}

export interface MarkBatchAsFailedProps {
  headTopologyHeight: number;
  lastIrreversibleBlock: number;
  failedAtBlock: number;
  error: Record<string, any>;
}
