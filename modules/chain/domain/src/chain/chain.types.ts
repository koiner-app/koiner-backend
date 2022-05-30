import { BlockTopology } from '@koiner/domain';

export interface CreateChainProps {
  headTopology: BlockTopology;
  lastIrreversibleBlock: number;
  syncing: boolean;
  lastSyncedBlock: number;
}

export interface ChainProps extends CreateChainProps {
  stopped: boolean;
}

export interface UpdateChainProps {
  headTopology: BlockTopology;
  lastIrreversibleBlock: number;
  syncing: boolean;
  stopped: boolean;
  lastSyncedBlock: number;
}
