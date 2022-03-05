import { KoinosId } from '@koiner/domain';

export interface CreateKrc20ContractProps {
  blockHeight: number;
  transactionId: KoinosId;
  operationIndex: number;
  name: string;
  symbol: string;
  decimals: number;
}

export type Krc20ContractProps = CreateKrc20ContractProps;
