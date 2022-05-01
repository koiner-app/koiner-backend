import { Injectable } from '@nestjs/common';
import { OperationType } from '@koiner/chain/domain';
import { OperationTypeResolver } from '../query/operation-type.resolver';
import { OperationDetailsUnion } from '../dto/operation-details.union';
import { OperationNode } from '../dto/operation.node';
import { SystemCallOperationsLoader } from '../dataloader/system-call-operations.loader';

@Injectable()
export class SystemCallOperationTypeResolver implements OperationTypeResolver {
  constructor(private readonly loader: SystemCallOperationsLoader) {}

  resolve(operation: OperationNode): Promise<typeof OperationDetailsUnion> {
    return this.loader.batch.load(operation.id);
  }

  supports(operation: OperationNode): Promise<boolean> {
    return Promise.resolve(operation.type === OperationType.systemCall);
  }
}
