export interface CreateTokenStatsProps {
  contractCount: number;
}

export interface TokenStatsProps extends CreateTokenStatsProps {
  operationCount: number;
  mintCount: number;
  burnCount: number;
  transferCount: number;
}

export interface UpdateTokenStatsProps {
  contractCount?: number;
  operationCount?: number;
  mintCount?: number;
  burnCount?: number;
  transferCount?: number;
}
