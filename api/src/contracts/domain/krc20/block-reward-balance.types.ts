import { KoinosAddressId } from '@koiner/domain';

export interface CreateBlockRewardBalanceProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
}

export type BlockRewardBalanceProps = CreateBlockRewardBalanceProps;
