import { registerEnumType } from '@nestjs/graphql';

export enum ContractOperationsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(ContractOperationsSortFieldEnum, {
  name: 'ContractOperationsSortField',
  description: 'Sort field',
});
