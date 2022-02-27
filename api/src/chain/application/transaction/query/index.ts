import { TransactionHandler } from './transaction.handler';
import { TransactionsHandler } from './transactions.handler';

export { TransactionQuery } from './transaction.query';
export { TransactionsQuery } from './transactions.query';

export default {
  handlers: [TransactionHandler, TransactionsHandler],
};
