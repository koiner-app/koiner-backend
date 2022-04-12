import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateKrc20OperationProps {
  contractId: KoinosAddressId;
  transactionId: KoinosId;
  name: string;
  from?: KoinosAddressId;
  to: KoinosAddressId;
  value: number;
}

export type Krc20OperationProps = CreateKrc20OperationProps;
