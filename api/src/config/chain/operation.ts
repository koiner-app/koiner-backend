import { OperationType } from '@koiner/chain/domain';
import { ContractOperationNode } from '@koiner/contracts/api/graphql/operation/dto/contract-operation.node';
import { SystemCallOperationNode } from '@koiner/chain/api/graphql/operation/dto/system-call-operation.node';
import { SystemContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/system-contract-operation.node';
import { UploadContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/upload-contract-operation.node';

export const operationUnionTypes = [
  // Chain
  SystemCallOperationNode,
  SystemContractOperationNode,
  UploadContractOperationNode,

  // Contracts
  ContractOperationNode,
];

export function resolveTypeFn(value: { type: OperationType }) {
  // Chain
  if (value.type === OperationType.systemCall) {
    return SystemCallOperationNode;
  }

  if (value.type === OperationType.systemContract) {
    return SystemContractOperationNode;
  }

  if (value.type === OperationType.uploadContract) {
    return UploadContractOperationNode;
  }

  // Contracts
  if (value.type === OperationType.contractOperation) {
    return ContractOperationNode;
  }

  return null;
}
