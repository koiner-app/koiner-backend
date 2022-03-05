import { KoinosId } from '@koiner/domain';

export interface CreateContractProps {
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
  bytecode: string;
  abi: string;
}

export type ContractProps = CreateContractProps;
