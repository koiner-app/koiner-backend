import { KoinosAddressId } from '@koiner/domain';

export interface CreateSystemContractOperationProps {
  contractId: KoinosAddressId;
  systemContract: boolean;
}

export type SystemContractOperationProps = CreateSystemContractOperationProps;
