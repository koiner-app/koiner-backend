import { ReadRepository } from '@appvise/domain';
import { Transaction } from './transaction';

export abstract class TransactionReadRepository extends ReadRepository<Transaction> {}
