import { registerEnumType } from '@nestjs/graphql';

export enum TransactionsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(TransactionsSortFieldEnum, {
  name: 'TransactionsSortField',
  description: 'Sort field',
});
