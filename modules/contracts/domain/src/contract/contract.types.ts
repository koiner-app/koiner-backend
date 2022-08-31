import { ContractStandardType } from '../contract-standard';

export interface CreateContractProps {
  bytecode: string;
  abi?: string;
  contractStandardType?: ContractStandardType;
  timestamp: number;
}

export type ContractProps = CreateContractProps;
