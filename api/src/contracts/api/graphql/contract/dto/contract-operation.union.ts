import { createUnionType } from '@nestjs/graphql';
import { Krc20OperationNode } from '@koiner/contracts/api/graphql/krc20/dto/krc20-operation.node';
import { ContractStandardType } from '@koiner/contracts/domain';

export const ContractOperationDetailsUnion = createUnionType({
  name: 'ContractOperationDetailsUnion',
  types: () => [Krc20OperationNode],
  resolveType(value: any) {
    if (value.contractStandardType === ContractStandardType.krc20) {
      return Krc20OperationNode;
    }

    return null;
  },
});
