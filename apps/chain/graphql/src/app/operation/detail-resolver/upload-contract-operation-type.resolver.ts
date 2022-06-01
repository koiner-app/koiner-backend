import { Injectable } from '@nestjs/common';
import { OperationType } from '@koiner/chain/domain';
import { OperationTypeResolver } from '../query/operation-type.resolver';
import { OperationDetailsUnion } from '../dto/operation-details.union';
import { OperationNode } from '../dto/operation.node';
import { UploadContractOperationsLoader } from '../dataloader/upload-contract-operations.loader';

@Injectable()
export class UploadContractOperationTypeResolver
  implements OperationTypeResolver
{
  constructor(private readonly loader: UploadContractOperationsLoader) {}

  resolve(operation: OperationNode): Promise<typeof OperationDetailsUnion> {
    return this.loader.batch.load(operation.id);
  }

  supports(operation: OperationNode): Promise<boolean> {
    return Promise.resolve(operation.type === OperationType.uploadContract);
  }
}
