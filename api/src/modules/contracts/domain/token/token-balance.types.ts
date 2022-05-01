import { KoinosAddressId } from '@koiner/domain';

export interface CreateTokenBalanceProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
  rewardsReceived?: number;
}

export interface UpdateTokenBalanceProps {
  amountChanged: number;
  tokensOrigin: TokensOrigin;
}

export enum TokensOrigin {
  transfer = 'transfer',
  mint = 'mint',
  blockReward = 'blockReward',
}

export type TokenBalanceProps = CreateTokenBalanceProps;
