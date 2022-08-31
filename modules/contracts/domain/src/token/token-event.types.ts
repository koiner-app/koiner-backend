import { KoinosAddressId } from '@koiner/domain';

export interface CreateTokenEventProps {
  contractId: KoinosAddressId;
  name: string;
  from?: KoinosAddressId;
  to?: KoinosAddressId;
  value: number;
  timestamp: number;
}

export type TokenEventProps = CreateTokenEventProps;
