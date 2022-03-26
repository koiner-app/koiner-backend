import { registerEnumType } from '@nestjs/graphql';

export enum OperationsSortFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
}

registerEnumType(OperationsSortFieldEnum, {
  name: 'OperationsSortField',
  description: 'Sort field',
});
