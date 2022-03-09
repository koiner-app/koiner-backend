import { createUnionType } from '@nestjs/graphql';
import { Krc20OperationNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operation.node';
import { UploadContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/upload-contract-operation.node';
import { ContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/contract-operation.node';
import { OperationType } from '@koiner/chain/domain';
import { SystemCallOperationNode } from '@koiner/chain/api/graphql/operation/dto/system-call-operation.node';
import { SystemContractOperationNode } from '@koiner/chain/api/graphql/operation/dto/system-contract-operation.node';

export const OperationDetailsUnion = createUnionType({
  name: 'OperationDetailsUnion',
  types: () => [
    Krc20OperationNode,
    UploadContractOperationNode,
    ContractOperationNode,
    SystemCallOperationNode,
    SystemContractOperationNode,
  ],
  resolveType(value: any) {
    if (value.type === OperationType.krc20Operation) {
      // TODO: && value.contractType === ContractType.krc20 ??
      return Krc20OperationNode;
    }

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
