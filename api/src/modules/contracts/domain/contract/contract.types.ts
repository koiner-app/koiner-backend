export interface CreateContractProps {
  bytecode: string;
  abi: string;
  contractStandardType?: string;
}

export type ContractProps = CreateContractProps;
