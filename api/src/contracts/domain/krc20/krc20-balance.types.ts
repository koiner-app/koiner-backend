import { KoinosAddressId } from '@koiner/domain';

export interface CreateKrc20BalanceProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
  rewardsReceived?: number;
}

export interface UpdateKrc20BalanceProps {
  amountChanged: number;
  tokensOrigin: TokensOrigin;
}

export enum TokensOrigin {
  transfer = 'transfer',
  mint = 'mint',
  blockReward = 'blockReward',
}

export type Krc20BalanceProps = CreateKrc20BalanceProps;
