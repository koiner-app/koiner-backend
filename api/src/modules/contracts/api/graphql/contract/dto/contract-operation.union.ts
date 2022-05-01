import { createUnionType } from '@nestjs/graphql';
import { TokenOperationNode } from '@koiner/contracts/api/graphql/token/dto/token-operation.node';
import { ContractStandardType } from '@koiner/contracts/domain';

export const ContractOperationDetailsUnion = createUnionType({
  name: 'ContractOperationDetailsUnion',
  types: () => [TokenOperationNode],
  resolveType(value: any) {
    if (value.contractStandardType === ContractStandardType.token) {
      return TokenOperationNode;
    }

    return null;
  },
});
