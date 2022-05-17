import { TokenContractStatistics } from '@koiner/contracts/domain';
import { UpdateTokenContractStatisticsProps } from '.';

export interface CreateTokenContractProps {
  name: string;
  symbol: string;
  decimals: number;
}

export interface TokenContractProps extends CreateTokenContractProps {
  totalSupply: number;
  stats: TokenContractStatistics;
}

export interface UpdateTokenContractProps {
  mintedTokens?: number;
  stats?: UpdateTokenContractStatisticsProps;
}
