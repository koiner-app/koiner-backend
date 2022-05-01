import { KoinosId } from '@koiner/domain';
import { TokenContractStatistics } from '@koiner/contracts/domain';
import { UpdateTokenContractStatisticsProps } from './token-contract-statistics';

export interface CreateTokenContractProps {
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
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
