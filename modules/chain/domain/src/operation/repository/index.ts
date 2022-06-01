import { ReadRepository, WriteRepository } from '@appvise/domain';
import {
  Operation,
  SystemCallOperation,
  SystemContractOperation,
  UploadContractOperation,
} from '..';

export abstract class OperationReadRepository extends ReadRepository<Operation> {}
export abstract class OperationWriteRepository extends WriteRepository<Operation> {}
export abstract class SystemCallOperationReadRepository extends ReadRepository<SystemCallOperation> {}
export abstract class SystemCallOperationWriteRepository extends WriteRepository<SystemCallOperation> {}
export abstract class SystemContractOperationReadRepository extends ReadRepository<SystemContractOperation> {}
export abstract class SystemContractOperationWriteRepository extends WriteRepository<SystemContractOperation> {}
export abstract class UploadContractOperationReadRepository extends ReadRepository<UploadContractOperation> {}
export abstract class UploadContractOperationWriteRepository extends WriteRepository<UploadContractOperation> {}
