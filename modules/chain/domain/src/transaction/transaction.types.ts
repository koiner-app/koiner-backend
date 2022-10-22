import { Operation, TransactionHeader, TransactionReceipt } from '..';

export interface CreateTransactionProps {
  blockHeight: number;
  operationCount: number;
  signatures: string[];
  transactionIndex: number;
  timestamp: number;
  header: TransactionHeader;
  receipt: TransactionReceipt;
}

export interface TransactionProps extends CreateTransactionProps {
  operations: Operation[];
}
