import { KoinosId } from '@koiner/domain';

export interface CreateContractProps {
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
  bytecode: string;
  abi: string;
  contractStandardType?: string;
}

export type ContractProps = CreateContractProps;
