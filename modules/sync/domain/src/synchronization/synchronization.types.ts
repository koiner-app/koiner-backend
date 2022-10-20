import { BlockTopology } from '@koiner/domain';

export interface CreateSynchronizationProps {
  headTopology: BlockTopology;
  lastIrreversibleBlock: number;
  syncing: boolean;
  lastSyncedBlock: number;
}

export interface SynchronizationProps extends CreateSynchronizationProps {
  stopped: boolean;
  lastSyncStarted: number;
}

export interface UpdateSynchronizationProps {
  headTopology: BlockTopology;
  lastIrreversibleBlock: number;
  syncing: boolean;
  stopped: boolean;
  lastSyncedBlock: number;
}
