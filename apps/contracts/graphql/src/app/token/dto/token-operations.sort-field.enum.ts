import { registerEnumType } from '@nestjs/graphql';

export enum TokenOperationsSortFieldEnum {
  createdAt = 'createdAt',
}

registerEnumType(TokenOperationsSortFieldEnum, {
  name: 'TokenOperationsSortField',
  description: 'Sort field',
});
