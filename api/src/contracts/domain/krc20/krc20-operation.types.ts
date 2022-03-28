import { KoinosAddressId } from '@koiner/domain';

export interface CreateKrc20OperationProps {
  contractId: KoinosAddressId;
  name: string;
  from?: KoinosAddressId;
  to: KoinosAddressId;
  value: string;
}

export type Krc20OperationProps = CreateKrc20OperationProps;
