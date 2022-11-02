import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateTokenOperationProps {
  blockHeight: number;
  contractId: KoinosAddressId;
  transactionId: KoinosId;
  name: string;
  from?: KoinosAddressId;
  to?: KoinosAddressId;
  value: number;
  timestamp: number;
}

export type TokenOperationProps = CreateTokenOperationProps;
