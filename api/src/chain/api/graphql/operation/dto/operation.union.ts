import { createUnionType } from '@nestjs/graphql';
import { OperationType } from '@koiner/chain/domain';
import { UploadContractOperationNode } from './upload-contract-operation.node';
import { ContractOperationNode } from './contract-operation.node';
import { SystemCallOperationNode } from './system-call-operation.node';
import { SystemContractOperationNode } from './system-contract-operation.node';

export const OperationDetailsUnion = createUnionType({
  name: 'OperationDetailsUnion',
  types: () => [
    UploadContractOperationNode,
    ContractOperationNode,
    SystemCallOperationNode,
    SystemContractOperationNode,
  ],
  resolveType(value: any) {
    if (value.type === OperationType.uploadContract) {
      return UploadContractOperationNode;
    }

    if (value.type === OperationType.contractOperation) {
      return ContractOperationNode;
    }

    if (value.type === OperationType.systemCall) {
      return SystemCallOperationNode;
    }

    if (value.type === OperationType.systemContractOperation) {
      return SystemContractOperationNode;
    }

    return null;
  },
});
