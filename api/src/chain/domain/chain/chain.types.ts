import { BlockTopology } from '@koiner/domain';
import { ChainStatistics } from '@koiner/chain/domain';

export interface CreateChainProps {
  headTopology: BlockTopology;
  lastIrreversibleBlock: number;
  syncing: boolean;
  lastSyncedBlock: number;
}

export interface ChainProps extends CreateChainProps {
  stats: ChainStatistics;
  stopped: boolean;
}

export interface UpdateChainProps {
  headTopology: BlockTopology;
  lastIrreversibleBlock: number;
  syncing: boolean;
  stopped: boolean;
  lastSyncedBlock: number;
}
