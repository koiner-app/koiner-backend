import { ContractStandardType } from '@koiner/contracts/domain';

export interface CreateContractProps {
  bytecode: string;
  abi: string;
  contractStandardType?: ContractStandardType;
}

export type ContractProps = CreateContractProps;
