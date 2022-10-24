import { ChainStats } from '.';

export interface CreateChainProps {
  stats: ChainStats;
}

export interface ChainProps extends CreateChainProps {
  timestamp: number;
}
