export interface CreateTokenContractProps {
  name: string;
  symbol: string;
  decimals: number;
  timestamp: number;
  totalSupply?: number;
  mintCount?: number;
  burnCount?: number;
  transferCount?: number;
}

export interface TokenContractProps extends CreateTokenContractProps {
  totalSupply: number;
  mintCount: number;
  burnCount: number;
  transferCount: number;
}

export interface UpdateTokenContractProps {
  mintedTokens?: number;
  burnedTokens?: number;
  mintCount?: number;
  burnCount?: number;
  transferCount?: number;
}
