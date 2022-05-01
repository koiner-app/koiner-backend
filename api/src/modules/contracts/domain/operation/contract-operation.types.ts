import { KoinosAddressId, KoinosId } from '@koiner/domain';

export interface CreateContractOperationProps {
  contractId: KoinosAddressId;
  transactionId: KoinosId;
  entryPoint: number;
  args: string;
  contractStandardType?: string;
}

export type ContractOperationProps = CreateContractOperationProps;
