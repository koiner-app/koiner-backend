import { TransactionHeader } from '@koiner/chain/domain';

export interface CreateTransactionProps {
  blockHeight: number;
  header: TransactionHeader;
  signature: string;
  operationCount: number;
  transactionIndex: number;
}

export type TransactionProps = CreateTransactionProps;
