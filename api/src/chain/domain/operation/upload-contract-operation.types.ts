import { KoinosAddressId } from '@koiner/domain';

export interface CreateUploadContractOperationProps {
  contractId: KoinosAddressId;
  bytecode: string;
  abi: string;
  contractStandardType?: string;
}

export type UploadContractOperationProps = CreateUploadContractOperationProps;
