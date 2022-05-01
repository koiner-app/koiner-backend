import { registerEnumType } from '@nestjs/graphql';

export enum ContractOperationsSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(ContractOperationsSortFieldEnum, {
  name: 'ContractOperationsSortField',
  description: 'Sort field',
});
