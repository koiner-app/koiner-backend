import { KoinosAddressId } from '@koiner/domain';

export interface CreateContractOperationProps {
  contractId: KoinosAddressId;
  entryPoint: number;
  args: string;
}

export type ContractOperationProps = CreateContractOperationProps;
