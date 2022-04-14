import { WriteRepository } from '@appvise/domain';
import { Operation } from '../operation';

export abstract class OperationWriteRepository extends WriteRepository<Operation> {}
