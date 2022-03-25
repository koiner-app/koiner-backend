import { createUnionType } from '@nestjs/graphql';
import { Krc20OperationNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operation.node';
import { ContractStandardType } from '@koiner/contracts/domain';
import { UnknownContractOperationNode } from '@koiner/contracts/api/graphql/contract/dto/unknown-contract-operation.node';

export const ContractOperationDetailsUnion = createUnionType({
  name: 'ContractOperationDetailsUnion',
  types: () => [Krc20OperationNode, UnknownContractOperationNode],
  resolveType(value: any) {
    if (value.contractStandardType === ContractStandardType.krc20) {
      return Krc20OperationNode;
    }

    return UnknownContractOperationNode;
  },
});
