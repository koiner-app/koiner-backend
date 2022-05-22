import { registerEnumType } from '@nestjs/graphql';

export enum TokenBalancesSortFieldEnum {
  balance = 'balance',
  createdAt = 'createdAt',
}

registerEnumType(TokenBalancesSortFieldEnum, {
  name: 'TokenBalancesSortField',
  description: 'Sort field',
});
