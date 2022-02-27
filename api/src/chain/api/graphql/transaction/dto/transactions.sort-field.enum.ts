import { registerEnumType } from '@nestjs/graphql';

export enum TransactionsSortFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
}

registerEnumType(TransactionsSortFieldEnum, {
  name: 'TransactionsSortField',
  description: 'Sort field',
});
