import { ReadRepository } from '@appvise/domain';
import { Operation } from '../operation';

export abstract class OperationReadRepository extends ReadRepository<Operation> {}
