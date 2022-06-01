import { ContractStandardType } from '../contract-standard';

export interface CreateContractProps {
  bytecode: string;
  abi?: string;
  contractStandardType?: ContractStandardType;
}

export type ContractProps = CreateContractProps;
