import { Injectable } from '@nestjs/common';
import { OperationType } from '@koiner/chain/domain';
import { OperationTypeResolver } from '../query/operation-type.resolver';
import { OperationDetailsUnion } from '../dto/operation-details.union';
import { OperationNode } from '../dto/operation.node';
import { ContractOperationNode } from '../dto/contract-operation.node';

@Injectable()
export class ContractOperationTypeResolver implements OperationTypeResolver {
  resolve(operation: OperationNode): Promise<typeof OperationDetailsUnion> {
    return new Promise((resolve) => {
      resolve(new ContractOperationNode(operation));
    });
  }

  supports(operation: OperationNode): Promise<boolean> {
    return Promise.resolve(operation.type === OperationType.contractOperation);
  }
}
