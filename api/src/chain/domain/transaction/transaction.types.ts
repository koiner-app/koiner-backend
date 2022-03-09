import { Operation, TransactionHeader } from '@koiner/chain/domain';

export interface CreateTransactionProps {
  blockHeight: number;
  header: TransactionHeader;
  operations: Operation[];
  signature: string;
  operationCount: number;
  transactionIndex: number;
}

export type TransactionProps = CreateTransactionProps;
