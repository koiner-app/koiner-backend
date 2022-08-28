import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateTokenOperationProps {
  contractId: KoinosAddressId;
  transactionId: KoinosId;
  name: string;
  from?: KoinosAddressId;
  to?: KoinosAddressId;
  value: number;
}

export type TokenOperationProps = CreateTokenOperationProps;
