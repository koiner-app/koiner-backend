import { registerEnumType } from '@nestjs/graphql';

export enum TokenOperationsSortFieldEnum {
  id = 'id',
  createdAt = 'createdAt',
}

registerEnumType(TokenOperationsSortFieldEnum, {
  name: 'TokenOperationsSortField',
  description: 'Sort field',
});
