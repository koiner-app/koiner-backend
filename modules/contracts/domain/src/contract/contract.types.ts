import { ContractStandardType } from '@koiner/contracts/standards';

export interface CreateContractProps {
  bytecode: string;
  abi?: string;
  contractStandardType?: ContractStandardType;
  timestamp: number;
}

export type ContractProps = CreateContractProps;
