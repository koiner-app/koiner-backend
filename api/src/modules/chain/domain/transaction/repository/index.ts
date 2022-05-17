import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Transaction } from '..';

export abstract class TransactionReadRepository extends ReadRepository<Transaction> {}
export abstract class TransactionWriteRepository extends WriteRepository<Transaction> {}
