import { registerEnumType } from '@nestjs/graphql';

export enum TokenHoldersSortFieldEnum {
  balance = 'balance',
  createdAt = 'createdAt',
}

registerEnumType(TokenHoldersSortFieldEnum, {
  name: 'TokenHoldersSortField',
  description: 'Sort field',
});
