import { Operation, TransactionHeader } from '@koiner/chain/domain';

export interface CreateTransactionProps {
  blockHeight: number;
  header: TransactionHeader;
  signature: string;
  operationCount: number;
  transactionIndex: number;
}

export interface TransactionProps extends CreateTransactionProps {
  operations: Operation[];
}
