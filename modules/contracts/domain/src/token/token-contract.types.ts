export interface CreateTokenContractProps {
  name: string;
  symbol: string;
  decimals: number;
}

export interface TokenContractProps extends CreateTokenContractProps {
  totalSupply: number;
}

export interface UpdateTokenContractProps {
  mintedTokens?: number;
  burnedTokens?: number;
}
