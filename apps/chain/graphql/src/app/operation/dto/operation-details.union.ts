import { createUnionType } from '@nestjs/graphql';
import { OperationType } from '@koiner/chain/domain';
import { ContractOperationNode } from './contract-operation.node';
import { SystemCallOperationNode } from './system-call-operation.node';
import { SystemContractOperationNode } from './system-contract-operation.node';
import { UploadContractOperationNode } from './upload-contract-operation.node';

export const OperationDetailsUnion = createUnionType({
  name: 'OperationDetailsUnion',
  types: () => [
    ContractOperationNode,
    SystemCallOperationNode,
    SystemContractOperationNode,
    UploadContractOperationNode,
  ],
  resolveType: (value: { type: OperationType }) => {
    if (value.type === OperationType.contractOperation) {
      return ContractOperationNode;
    }

    if (value.type === OperationType.systemCall) {
      return SystemCallOperationNode;
    }

    if (value.type === OperationType.systemContract) {
      return SystemContractOperationNode;
    }

    if (value.type === OperationType.uploadContract) {
      return UploadContractOperationNode;
    }

    return null;
  },
});
