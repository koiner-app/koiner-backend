import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateContractOperationProps {
  blockHeight: number;
  contractId: KoinosAddressId;
  transactionId: KoinosId;
  entryPoint: number;
  args?: string;
  contractStandardType?: string;
  timestamp: number;
}

export type ContractOperationProps = CreateContractOperationProps;
