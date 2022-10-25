export interface CreateTokenStatsProps {
  contractCount: number;
}

export interface TokenStatsProps extends CreateTokenStatsProps {
  transferCount: number;
}

export interface UpdateTokenStatsProps {
  contractCount?: number;
  transferCount?: number;
}
