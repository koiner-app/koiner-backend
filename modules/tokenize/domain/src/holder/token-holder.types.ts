import { KoinosAddressId } from '@koiner/domain';

export interface CreateTokenHolderProps {
  contractId: KoinosAddressId;
  balance: number;
}

export interface UpdateTokenHolderProps {
  amountChanged: number;
}

export type TokenHolderProps = CreateTokenHolderProps;
