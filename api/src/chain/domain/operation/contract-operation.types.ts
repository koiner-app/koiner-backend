import { KoinosAddressId } from '@koiner/domain';

export interface CreateContractOperationProps {
  contractId: KoinosAddressId;
  entryPoint: number;
  args: string;
  contractStandardType?: string;
}

export type ContractOperationProps = CreateContractOperationProps;
