import { KoinosAddressId } from '@koiner/domain';

export interface CreateTokenBalanceProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
}

export interface UpdateTokenBalanceProps {
  amountChanged: number;
}

export type TokenBalanceProps = CreateTokenBalanceProps;
