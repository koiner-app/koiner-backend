import { KoinosAddressId } from '@koiner/domain';

export interface CreateKrc20BalanceProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
}

export type Krc20BalanceProps = CreateKrc20BalanceProps;
