export interface CreateTokenStatsProps {
  contractCount: number;
}

export interface TokenStatsProps extends CreateTokenStatsProps {
  operationCount: number;
  transferCount: number;
}

export interface UpdateTokenStatsProps {
  contractCount?: number;
  operationCount?: number;
  transferCount?: number;
}
