import { KoinosId } from '@koiner/domain';
import { Krc20ContractStatistics } from '@koiner/contracts/domain';
import { UpdateKrc20ContractStatisticsProps } from './krc20-contract-statistics';

export interface CreateKrc20ContractProps {
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Krc20ContractProps extends CreateKrc20ContractProps {
  totalSupply: number;
  stats: Krc20ContractStatistics;
}

export interface UpdateKrc20ContractProps {
  mintedTokens?: number;
  stats?: UpdateKrc20ContractStatisticsProps;
}
