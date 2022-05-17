import { createUnionType } from '@nestjs/graphql';
import { ContractStandardType } from '@koiner/contracts/domain';
import { TokenOperationNode } from '@koiner/contracts/api/graphql/token/dto/token-operation.node';

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
