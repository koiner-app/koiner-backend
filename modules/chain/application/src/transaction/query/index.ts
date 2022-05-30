import { ItemQuery, SearchQuery } from '@appvise/domain';

export class TransactionQuery extends ItemQuery {}
export class TransactionsQuery extends SearchQuery {}

import { TransactionHandler } from './transaction.handler';
import { TransactionsHandler } from './transactions.handler';

export const TransactionQueryHandlers = [
  TransactionHandler,
  TransactionsHandler,
];
