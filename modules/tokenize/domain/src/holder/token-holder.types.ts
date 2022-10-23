import { KoinosAddressId } from '@koiner/domain';

export interface CreateTokenHolderProps {
  addressId: KoinosAddressId;
  contractId: KoinosAddressId;
  balance: number;
  mintCount?: number;
  burnCount?: number;
  transferInCount?: number;
  transferOutCount?: number;
}

export interface UpdateTokenHolderProps {
  amountChanged: number;
  mintCount?: number;
  burnCount?: number;
  transferInCount?: number;
  transferOutCount?: number;
}

export interface TokenHolderProps extends CreateTokenHolderProps {
  mintCount: number;
  burnCount: number;
  transferInCount: number;
  transferOutCount: number;
}
