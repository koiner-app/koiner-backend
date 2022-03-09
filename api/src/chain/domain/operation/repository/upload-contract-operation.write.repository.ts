import { WriteRepository } from '@appvise/domain';
import { UploadContractOperation } from '../upload-contract-operation';

export abstract class UploadContractOperationWriteRepository extends WriteRepository<UploadContractOperation> {}
