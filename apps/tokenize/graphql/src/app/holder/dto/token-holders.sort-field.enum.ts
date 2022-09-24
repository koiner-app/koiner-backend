import { registerEnumType } from '@nestjs/graphql';

export enum TokenHoldersSortFieldEnum {
  balance = 'balance',
}

registerEnumType(TokenHoldersSortFieldEnum, {
  name: 'TokenHoldersSortField',
  description: 'Sort field',
});
