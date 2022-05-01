import { WriteRepository } from '@appvise/domain';
import { Transaction } from './transaction';

export abstract class TransactionWriteRepository extends WriteRepository<Transaction> {}
